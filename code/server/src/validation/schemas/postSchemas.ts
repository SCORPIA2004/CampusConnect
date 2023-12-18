/**
 * This file contains global validation schemas for the server application.
 * @remarks
 * The customEmailValidator function is used to validate email addresses. It checks if the email address matches the pattern /^[A-Za-z0-9._%+-]+@[^.]+.bilkent.edu.tr$/.
 * The bilkentEmailValidation schema is used to validate Bilkent school email addresses. It uses the customEmailValidator function and applies additional constraints such as maximum length, trimming, and lowercase conversion.
 * The passwordValidation schema is used to validate passwords. It checks if the password has a minimum length of 8 characters and a maximum length of 50 characters.
 * These validation schemas are used throughout the server application to ensure the validity of user input.
 */
import Joi, {boolean} from "joi";
import {bilkentEmailValidation} from "@/schemas/globalSchemas";

export const create_post_schema = Joi.object({
    type: Joi.string().valid("FORUM", "LOST", "SALE", "DONATE", "BORROW").required(),
    title: Joi.string().max(100).required(),
    description: Joi.string().max(5000).allow(""),

    isAnonymous: Joi.when('type', {
        is: 'FORUM',
        then: Joi.boolean().required(),
        otherwise: Joi.forbidden(),
    }),

    parentPostID: Joi.when('type', {
        is: 'FORUM',
        then: Joi.string().max(16).allow(null),
        otherwise: Joi.forbidden(),
    }),
    images: Joi.when('type', {
        is: 'BORROW',
        then: Joi.array().items(Joi.string().dataUri()).forbidden(),
        otherwise: Joi.array().items(Joi.string().dataUri()),
    }),
    duration: Joi.when('type', {
        is: 'BORROW',
        then: Joi.number().positive().required(),
        otherwise: Joi.number().forbidden(),
    }),

    price: Joi.when('type', {
        is: ['SALE', 'DONATE'],
        then: Joi.when('type', {
            is: 'DONATE',
            then: Joi.valid(0),
            otherwise: Joi.number().positive().required(),
        }),
        otherwise: Joi.forbidden(),
    })
});

export const update_post_schema: Joi.ObjectSchema = Joi.object({
    postID: Joi.string().max(16).required(),
    isAnonymous: Joi.boolean(),
    title: Joi.string().max(100),
    description: Joi.string().max(5000),
    images: Joi.array().items(Joi.string().dataUri()),
    duration: Joi.number().positive(),
    price: Joi.number().positive(),
    isResolved: Joi.boolean(),
})
export const delete_post_schema: Joi.ObjectSchema = Joi.object({
    postID: Joi.string().max(16).required(),
})
export const search_posts_schema = Joi.object({
    type: Joi.string().valid("FORUM", "LOST", "SALE", "DONATE", "BORROW"),
    postID: Joi.string().max(16),
    creatorEmail: bilkentEmailValidation,
    viewResolved: Joi.boolean(),
    isComment: Joi.boolean(),
    keywords: Joi.string().max(100),
    sortByNewest: Joi.boolean(),
    sortByPrice: Joi.boolean(),
    sortByLikes: Joi.boolean(),
    sortByBorrowDuration: Joi.boolean(),
});