
/**
 * Manages chat data in the database.
 * 
 * @remarks
 * This module provides functions to add messages to a chat, retrieve a chat between two participants,
 * and retrieve all chats for a given email address.
 */

import {chatCollection} from "@/database/index";
import Chat, {Message} from "@/interfaces/chatModel";
import {generateSmallRandomToken} from "@/src/crypto/crypto";

/**
 * Adds a message to a chat.
 * 
 * @param chatID - The ID of the chat.
 * @param message - The message to be added.
 * @returns Promise<void>
 */
export const db_addMessage = async (chatID: string, message: Message): Promise<void> => {
    await chatCollection.updateOne(
        {
            _id: chatID
        },
        {$push: {messages: message}}
    );
}

/**
 * Retrieves a chat between two participants.
 * 
 * @param senderEmail - The email address of the sender.
 * @param recipientEmail - The email address of the recipient.
 * @param senderFirstname - The first name of the sender.
 * @param senderLastname - The last name of the sender.
 * @param recipientFirstname - The first name of the recipient.
 * @param recipientLastname - The last name of the recipient.
 * @returns Promise<any>
 */
export const db_getChat = async (senderEmail: string, recipientEmail: string, senderFirstname: string, senderLastname: string, recipientFirstname: string, recipientLastname: string): Promise<any> => {
    let chat: any = await chatCollection.findOne(
        {
            $or: [
                {participant0Email: senderEmail, participant1Email: recipientEmail},
                {participant0Email: recipientEmail, participant1Email: senderEmail}
            ]
        }
    );

    if (!chat) {
        chat = {
            _id: generateSmallRandomToken(),
            messages: [],
            participant0Email: senderEmail,
            participant0FirstName: senderFirstname,
            participant0LastName: senderLastname,
            participant1FirstName: recipientFirstname,
            participant1LastName: recipientLastname,
            participant1Email: recipientEmail,
        }
        await chatCollection.insertOne(chat);
    }

    return chat;
}

/**
 * Retrieves all chats for a given email address.
 * 
 * @param email - The email address.
 * @returns Promise<any[]>
 */
export const db_getChats = async (email: string): Promise<any[]> => {
    return await chatCollection.find(
        {
            $or: [
                {participant0Email: email},
                {participant1Email: email}
            ]
        }
    ).toArray();
}
