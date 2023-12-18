
/**
 * Handles socket routes for real-time chat functionality.
 * 
 * @param io - The socket.io server instance.
 * 
 * @remarks
 * This module exports a function `attachSocketRoutes` that attaches socket routes for real-time chat functionality.
 * It listens for socket connections and handles events such as sending and receiving messages, joining and leaving chats.
 * The `validateSocketConnection` function validates the socket connection by checking the user's authentication token.
 * The `notifyChat` function notifies other users in the chat about the user's activity status.
 * The `activeUsers` map keeps track of active users by mapping their email to their socket ID.
 */
import {Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {db_getUserByAuthToken, db_getUserByEmail} from "@/database/users";
import {validateMessageRequest} from "@/validation/chatValidator";
import {db_getChats} from "@/database/chats";

export const activeUsers= new Map();

export const attachSocketRoutes = (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    io.on('connection', async (socket) => {
        if (await validateSocketConnection(socket)) {
            socket.on('message', (data: string, callback: Function) => validateMessageRequest(data, socket, callback));
            await notifyChat(true, socket)
            socket.on('disconnect', () => {
                notifyChat(false, socket);
                activeUsers.delete(socket.id)
            });
        }
    });
}


const validateSocketConnection = async (socket: any) => {

    const token = socket.handshake.query.token;

    const user = await db_getUserByAuthToken(token);

    if (!user) {
        socket.disconnect();
        return false;
    }

    activeUsers.set(user.email, socket.id)

    socket.join(user.authToken)
    socket.join(user.email)

    return true;
}

const notifyChat = async (isActive: boolean, socket: any) => {
    const userEmail = Array.from(activeUsers.entries()).find(([, value]) => value === socket.id)?.[0];

    if (!userEmail) {
        return;
    }
    const chats = await db_getChats(userEmail);

    for (const chat of chats) {
        const userSocketID = activeUsers.get(chat.participant0Email === userEmail ? chat.participant1Email : chat.participant0Email)
        if (userSocketID) {
            socket.to(userSocketID).emit('activity', {
                email: userEmail,
                isActive: isActive
            });
        }
    }
}