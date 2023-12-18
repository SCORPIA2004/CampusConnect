/**
 * Validates and handles user-related requests.
 * 
 * @remarks
 * This file contains functions that validate and handle various user-related requests.
 * It exports functions for validating create, get, update, and delete user requests.
 * Each validation function uses the corresponding schema to validate the request data.
 * If the validation is successful, the request is passed to the corresponding handler function.
 * The handler function performs the necessary operations and sends the response back to the client.
 */

import {Request, Response} from "express";
import {handleQueryDataRequest, handleBodyDataRequest, sendResponse} from "./index";
import {
    create_user_schema, get_user_by_email_schema, get_user_schema, update_user_schema,
} from "@/schemas/userSchemas";
import handleCreateUser from "@/handlers/users/create";
import handleGetUser from "@/handlers/users/get";
import handleDeleteUser from "@/handlers/users/delete";
import handleUpdateUser from "@/handlers/users/update";

/**
 * Validates and handles a create user request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves when the request is handled.
 * 
 * @remarks
 * This function validates the request body data against the create_user_schema.
 * If the validation is successful, it calls the handleCreateUser function to create a new user.
 * The handleCreateUser function sends the response back to the client.
 */
export const validateCreateUserRequest = async (req: Request, res: Response) => {
    await handleBodyDataRequest(create_user_schema, req, res, false, async (data: any) => {
        await handleCreateUser(data, (code: number, data: any) => sendResponse(res, code, data))
    });
};

/**
 * Validates and handles a get user request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves when the request is handled.
 * 
 * @remarks
 * This function validates the request query data against the get_user_schema.
 * If the validation is successful, it calls the handleGetUser function to get the user data.
 * The handleGetUser function sends the response back to the client.
 */
export const validateGetUserRequest = async (req: Request, res: Response) => {
    await handleQueryDataRequest(get_user_schema, req, res, true, async (data: any, token: any) => {
        await handleGetUser(data.email, token, (code: number, data: any) => sendResponse(res, code, data))
    });
};

/**
 * Validates and handles an update user request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves when the request is handled.
 * 
 * @remarks
 * This function validates the request body data against the update_user_schema.
 * If the validation is successful, it calls the handleUpdateUser function to update the user data.
 * The handleUpdateUser function sends the response back to the client.
 */
export const validateUpdateUserRequest = async (req: Request, res: Response) => {
    await handleBodyDataRequest(update_user_schema, req, res, true, async (data: any, token: any) => {
        await handleUpdateUser(token, data, (code: number, data: any) => sendResponse(res, code, data))
    });
};

/**
 * Validates and handles a delete account request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves when the request is handled.
 * 
 * @remarks
 * This function validates the request query data against undefined.
 * If the validation is successful, it calls the handleDeleteUser function to delete the user account.
 * The handleDeleteUser function sends the response back to the client.
 */
export const validateDeleteAccountRequest = async (req: Request, res: Response) => {
    await handleQueryDataRequest(undefined, req, res, true, async (data: any, token: any) => {
        await handleDeleteUser(token, (code: number, data: any) => sendResponse(res, code, data))
    });
};