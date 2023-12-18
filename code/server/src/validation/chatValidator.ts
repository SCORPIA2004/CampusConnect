/**

Validates chat-related requests and performs the necessary actions.
@remarks
This file contains functions for validating and handling chat-related requests.
The validateMessageRequest function validates a message request, ensuring it matches the message_schema.
If the request is valid, it calls the handleSendMessage function to handle sending the message.
The validateGetChatsRequest function validates a get chats request, ensuring it has the required parameters.
If the request is valid, it calls the handleGetChats function to handle retrieving the chats.
Both functions use helper functions from the handleQueryDataRequest, handleSocketRequest, and sendResponse modules.
These helper functions handle common tasks such as handling query data, socket requests, and sending responses.
This file solves the problem of validating and handling chat-related requests in a server application.
It ensures that the requests are properly validated and the appropriate actions are taken based on the request type.
*/

import {handleQueryDataRequest, handleSocketRequest, sendResponse} from "@/validation/index";
import handleSendMessage from "@/handlers/chats/send";
import {message_schema} from "@/schemas/messageSchemas";
import {delete_post_schema} from "@/schemas/postSchemas";
import handleDeletePost from "@/handlers/posts/delete";
import {Request, Response} from "express";
import handleGetChats from "@/handlers/chats/get";

export const validateMessageRequest = async (message: any, socket: any, callback: any) => {
    await handleSocketRequest(message_schema, message, callback, socket, async (data: any, authToken) => {
        await handleSendMessage(authToken, data, callback, socket)
    });
}

export const validateGetChatsRequest = async (req: Request, res: Response) => {
    await handleQueryDataRequest(undefined, req, res, true, async (data: any, token: any) => {
        await handleGetChats(token, (code: number, data: any) => sendResponse(res, code, data))
    });
}
