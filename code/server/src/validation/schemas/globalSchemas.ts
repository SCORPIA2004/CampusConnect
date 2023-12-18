/**

Defines global validation schemas for the server.
@remarks
This file contains validation schemas for email and password fields used in the server.
The customEmailValidator function is used to validate if an email address is a valid Bilkent school email address.
The bilkentEmailValidation schema is used to validate email addresses, ensuring they are Bilkent school email addresses.
The passwordValidation schema is used to validate passwords, ensuring they meet the minimum and maximum length requirements.
These validation schemas can be used throughout the server to validate user input. */
import Joi from "joi";

export const customEmailValidator = (
  value: string,
  helpers: { error: (arg0: string) => any }
) => {
  if (/^[A-Za-z0-9._%+-]+@[^.]+\.bilkent\.edu\.tr$/.test(value)) {
    return value;
  }
  return helpers.error("email.invalid");
};
export const bilkentEmailValidation = Joi.string()
  .max(50)
  .trim()
  .lowercase()
  .custom(customEmailValidator, "custom email validation")
  .messages({
    "email.invalid": "Please provide a Bilkent school email address.",
  });
export const passwordValidation = Joi.string().min(8).max(50);
