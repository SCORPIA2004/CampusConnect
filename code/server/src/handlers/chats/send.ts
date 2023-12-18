/**
 * Handles sending a message between users.
 * 
 * @param authToken - The authentication token of the user sending the message.
 * @param data - The data containing the recipient's email and the message content.
 * @param callback - The callback function to be called after sending the message.
 * @param socket - The socket object for real-time communication.
 * @returns void
 * 
 * @remarks
 * This function handles the process of sending a message between users in a chat application.
 * It first verifies the authenticity of the user sending the message using the authentication token.
 * Then, it retrieves the recipient user based on the provided email.
 * If the recipient user is not found or the recipient email is the same as the sender's email, an error is returned.
 * Next, it retrieves the chat between the sender and recipient users or creates a new chat if it doesn't exist.
 * The message is then constructed with the sender's email, text, image, and the current date.
 * The message is added to the chat in the database.
 * The sender's email is removed from the message object for security reasons.
 * The recipient user information is added to the message object.
 * The callback function is called with a success status and the message object.
 * The sender user information is added to the message object.
 * The message is emitted to the recipient user's socket for real-time communication.
 * If an error occurs during the process, an error message is logged and an error response is sent via the callback function.
 */
import {db_getUserByAuthToken, db_getUserByEmail} from "@/database/users";
import {Message} from "@/interfaces/chatModel";
import {db_addMessage, db_getChat} from "@/database/chats";
import User from "@/interfaces/userModel";

const handleSendMessage = async (authToken: any, data: any, callback: Function, socket: any) => {

    try {

        const user : User = await db_getUserByAuthToken(authToken);
        const recipientUser = await db_getUserByEmail(data.recipientEmail);

        if (!recipientUser || user.email === recipientUser.email) {
            callback({status: 400, message: "Invalid recipient email"});
            return;
        }

        const chat = await db_getChat(user.email, recipientUser.email, user.firstName, user.lastName, recipientUser.firstName, recipientUser.lastName);

        let message: any = {
            senderEmail: user.email,
            text: data.text,
            image: data.image,
            dateSent: new Date()
        }

        await db_addMessage(chat._id, message);

        delete message.senderEmail

        message.recipientUser = {
            firstName: recipientUser.firstName,
            lastName: recipientUser.lastName,
            email: recipientUser.email,
        };

        callback({status: 200, message});

        delete message.recipientUser

        message.senderUser = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        socket.to(recipientUser.email).emit('message', message);

    } catch (error) {
        console.error('Error occurred while sending message', error);
        callback({status: 500, message: 'An Error occurred while sending message. Please try again later.'});
    }
};

export default handleSendMessage