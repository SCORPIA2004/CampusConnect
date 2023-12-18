/**
 * Validates and handles chat-related requests.
 * 
 * @remarks
 * This file contains functions for validating and handling chat-related requests.
 * The `validateMessageRequest` function validates a message request, ensuring it matches the `message_schema`.
 * If the request is valid, it calls the `handleSendMessage` function to handle sending the message.
 * 
 * The `validateGetChatsRequest` function validates a get chats request, ensuring it has the required parameters.
 * If the request is valid, it calls the `handleGetChats` function to handle retrieving the chats.
 * 
 * Both functions use helper functions from the `handleQueryDataRequest`, `handleSocketRequest`, and `sendResponse` modules.
 * These helper functions handle common tasks such as handling query data, socket requests, and sending responses.
 * 
 * This file solves the problem of validating and handling chat-related requests in a server application.
 * It ensures that the requests are properly validated and the appropriate actions are taken based on the request type.
 */
import {Request, Response} from "express";
import Joi from "joi";

export const handleQueryDataRequest = async (
    schema: Joi.ObjectSchema | undefined,
    req: Request,
    res: Response,
    requireAuthorization: boolean,
    handler: (data: any, token: any) => Promise<void>
) => {
    let token;

    if (requireAuthorization) {
        const tokenSchema = Joi.string().token().max(64).min(64).required()
        const {error, value} = tokenSchema.validate(req.headers.auth);
        if (error) {
            res.status(401).send("Please login to perform this operation.");
            return;
        }
        token = value;
    }

    if (schema) {
        const {error, value} = schema.validate(req.query);

        if (error) {
            res.status(400).send(error?.details[0]?.message);
            return;
        }

        await handler(value, token);
    } else {
        await handler(undefined, token);
    }

};
export const handleBodyDataRequest = async (
    schema: Joi.ObjectSchema,
    req: Request,
    res: Response,
    requireAuthorization: boolean,
    handler: (data: any, token: any) => Promise<void>
) => {
    let token;

    if (requireAuthorization) {
        const tokenSchema = Joi.string().token().max(64).min(64).required()
        const {error, value} = tokenSchema.validate(req.headers.auth);
        if (error) {
            res.status(401).send("Please login to perform operations");
            return;
        }
        token = value;
    }
    const {error, value} = schema.validate(req.body);

    if (error) {
        res.status(400).send(error?.details[0]?.message);
        return;
    }

    await handler(value, token);
};

export const handleSocketRequest = async (
    schema: Joi.ObjectSchema,
    data: any,
    callback: any,
    socket : any,
    handler: (data: any, authToken: unknown) => Promise<void>
) => {
    const {error, value} = schema.validate(data);

    if (error) {
        callback({status: 400, message: error?.details[0]?.message});
        return;
    }

    const authToken = Array.from(socket.rooms)[1]

    console.log(socket.rooms)

    await handler(value, authToken)
}

export const sendResponse = (res: Response, code: number, data: any) => {
    res.status(code).send(data);
};
