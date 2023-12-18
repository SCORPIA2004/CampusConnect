/**
 * This file contains validation schemas for messages in the server application.
 * @remarks
 * The message_schema object defines the validation schema for a message object.
 * It includes properties for recipientEmail, text, and image.
 * The recipientEmail property is validated using the bilkentEmailValidation schema.
 * The text property is validated as a string with a maximum length of 500 characters and is required.
 * The image property is validated as a string in data URI format.
 */
import Joi from "joi";
import {bilkentEmailValidation} from "@/schemas/globalSchemas";

export const message_schema = Joi.object({
    recipientEmail: bilkentEmailValidation,
    text: Joi.string().max(500).required(),
    image: Joi.string().dataUri()
});
