/**
 * Defines the validation schemas for authentication related operations.
 * 
 * @remarks
 * This file contains Joi validation schemas for login, register token, and forgot password operations.
 * These schemas are used to validate the input data for these operations.
 */

import Joi from "joi";
import {bilkentEmailValidation, passwordValidation} from "@/schemas/globalSchemas";

/**
 * The login validation schema.
 */
export const login_schema = Joi.object({
    email: bilkentEmailValidation.required(),
    password: passwordValidation.required(),
});

/**
 * The register token validation schema.
 */
export const register_token_schema: Joi.ObjectSchema = Joi.object({
    registerToken: Joi.string().token().max(1000).required(),
})

/**
 * The forgot password validation schema.
 */
export const forgot_password_schema: Joi.ObjectSchema = Joi.object({
    email:  bilkentEmailValidation.required(),
})