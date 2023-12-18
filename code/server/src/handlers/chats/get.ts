/**
 * Retrieves the chats for a user based on their authentication token.
 * 
 * @param authToken - The authentication token of the user.
 * @param respond - The function to send the response to the client.
 * 
 * @remarks
 * This function handles the retrieval of chats for a user based on their authentication token.
 * It first verifies the authentication token and checks if the user exists.
 * If the user is authenticated, it retrieves the chats associated with the user's email.
 * The function also checks if the participants of each chat are currently active.
 * Finally, it sends the retrieved chats as a response to the client.
 * If any error occurs during the process, an appropriate error response is sent.
 */
import {db_getUserByAuthToken, db_getUserByEmail} from "@/database/users";
import {db_getChats} from "@/database/chats";
import {activeUsers} from "@/src/server/socketRoutes";

const handleGetChats = async (authToken: string, respond: Function) => {
    try {
        const user = await db_getUserByAuthToken(authToken);

        if (!user) {
            respond(401,'Please login to get chats');
            return;
        }

        const chats = await db_getChats(user.email);

        for (const chat of chats) {
            if (activeUsers.has(chat.participant0Email)) {
                chat.participant0Active = true;
            }
            if (activeUsers.has(chat.participant1Email)) {
                chat.participant1Active = true;
            }
        }

        respond(200, chats);
    } catch (error) {
        console.error('Auth token verification error:', error);
        respond(500, 'An error occurred during users token verification.');
    }
};

export default handleGetChats