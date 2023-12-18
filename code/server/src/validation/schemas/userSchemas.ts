/**
 * Defines the validation schemas for user-related operations.
 * 
 * @remarks
 * This file contains Joi validation schemas for creating, updating, and retrieving user data.
 * The schemas define the required and optional fields, as well as the validation rules for each field.
 * These schemas are used to validate user input and ensure data integrity.
 */

import Joi from "joi";
import {bilkentEmailValidation, passwordValidation} from "@/schemas/globalSchemas";

const nameValidation = Joi.string().max(50);

/**
 * Schema for creating a user.
 */
export const create_user_schema = Joi.object({
    email: bilkentEmailValidation.required(),
    password: passwordValidation.required(),
    firstName: nameValidation.required(),
    lastName: nameValidation.required()
});

/**
 * Schema for updating a user.
 */
export const update_user_schema = Joi.object({
    firstName: nameValidation,
    lastName: nameValidation,
    password: Joi.string().min(8).max(50)
});

/**
 * Schema for retrieving a user by email.
 */
export const get_user_by_email_schema = Joi.object({
    email: bilkentEmailValidation.required()
});

/**
 * Schema for retrieving a user.
 */
export const get_user_schema = Joi.object({
    email: bilkentEmailValidation.allow(null)
});
