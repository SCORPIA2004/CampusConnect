/**
 * Validates login, confirm email, and forgot password requests.
 * 
 * @remarks
 * This file contains functions that validate login, confirm email, and forgot password requests.
 * Each function uses the handleBodyDataRequest or handleQueryDataRequest function from the "@/validation/index" module to validate the request data against the specified schemas.
 * If the request data is valid, the corresponding handler function is called to process the request.
 * The sendResponse function is used to send the response back to the client.
 */

import {Request, Response} from "express";
import {handleQueryDataRequest, handleBodyDataRequest, sendResponse} from "@/validation/index";
import handleLogin from "@/handlers/auth/login";
import {forgot_password_schema, login_schema, register_token_schema} from "@/schemas/authSchemas";
import handleConfirmEmail from "@/handlers/auth/confirmEmail";
import handleForgot from "@/handlers/auth/forgotPassword";

/**
 * Validates a login request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 */
export const validateLoginRequest = async (req: Request, res: Response) => {
    await handleBodyDataRequest(login_schema, req, res, false, async (data: any) => {
        await handleLogin(data.email, data.password, (code: number, data: any) => sendResponse(res, code, data));
    });
};

/**
 * Validates a confirm email request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 */
export const validateConfirmEmailRequest = async (req: Request, res: Response) => {
    await handleQueryDataRequest(register_token_schema, req, res, false, async (data: any, token: any) => {
        await handleConfirmEmail(data.registerToken, (code: number, data: any) => sendResponse(res, code, data))
    });
};

/**
 * Validates a forgot password request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 */
export const validateForgotPasswordRequest = async (req: Request, res: Response) => {
    await handleBodyDataRequest(forgot_password_schema, req, res, false, async (data: any) => {
        await handleForgot(data.email, (code: number, data: any) => sendResponse(res, code, data))
    });
};
