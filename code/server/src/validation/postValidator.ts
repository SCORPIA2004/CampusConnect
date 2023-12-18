/**
 * Validates and handles requests related to posts.
 * 
 * @remarks
 * This file contains functions that validate and handle various requests related to posts.
 * It exports functions for validating create, delete, update, get, and like post requests.
 * Each function uses the appropriate schema and handler functions to validate and handle the request.
 * The request data is extracted from the request object and passed to the corresponding handler function.
 * The response is sent back to the client using the sendResponse function.
 */

import {Request, Response} from "express";
import {
    handleQueryDataRequest,
    handleBodyDataRequest,
    sendResponse
} from "@/validation/index";
import {
    delete_post_schema,
    search_posts_schema,
    update_post_schema, create_post_schema
} from "@/schemas/postSchemas";
import handleDeletePost from "@/handlers/posts/delete";
import handleUpdatePost from "@/handlers/posts/update";
import handleGetPosts from "@/handlers/posts/get";
import handleCreatePost from "@/handlers/posts/create";
import handleLikePost from "@/handlers/posts/more/like";

/**
 * Validates and handles a create post request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves when the request is handled.
 * 
 * @remarks
 * This function validates a create post request by checking if the request body matches the create_post_schema.
 * If the validation is successful, the handleCreatePost function is called to handle the request.
 * The response from the handleCreatePost function is sent back to the client using the sendResponse function.
 */
export const validateCreatePostRequest = async (req: Request, res: Response) => {
    await handleBodyDataRequest(create_post_schema, req, res, true, async (data: any, token: any) => {
        await handleCreatePost(token, data, (code: number, data: any) => sendResponse(res, code, data))
    });
};

/**
 * Validates and handles a delete post request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves when the request is handled.
 * 
 * @remarks
 * This function validates a delete post request by checking if the request query matches the delete_post_schema.
 * If the validation is successful, the handleDeletePost function is called to handle the request.
 * The response from the handleDeletePost function is sent back to the client using the sendResponse function.
 */
export const validateDeletePostRequest = async (req: Request, res: Response) => {
    await handleQueryDataRequest(delete_post_schema, req, res, true, async (data: any, token: any) => {
        await handleDeletePost(token, data.postID, (code: number, data: any) => sendResponse(res, code, data))
    });
};

/**
 * Validates and handles an update post request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves when the request is handled.
 * 
 * @remarks
 * This function validates an update post request by checking if the request body matches the update_post_schema.
 * If the validation is successful, the handleUpdatePost function is called to handle the request.
 * The response from the handleUpdatePost function is sent back to the client using the sendResponse function.
 */
export const validateUpdatePostRequest = async (req: Request, res: Response) => {
    await handleBodyDataRequest(update_post_schema, req, res, true, async (data: any, token: any) => {
        await handleUpdatePost(token, data, (code: number, data: any) => sendResponse(res, code, data))
    });
};

/**
 * Validates and handles a get posts request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves when the request is handled.
 * 
 * @remarks
 * This function validates a get posts request by checking if the request query matches the search_posts_schema.
 * If the validation is successful, the handleGetPosts function is called to handle the request.
 * The response from the handleGetPosts function is sent back to the client using the sendResponse function.
 */
export const validateGetPostsRequest = async (req: Request, res: Response) => {
    await handleQueryDataRequest(search_posts_schema, req, res, true, async (data: any, token: any) => {
        await handleGetPosts(token, data, (code: number, data: any) => sendResponse(res, code, data))
    });
};

/**
 * Validates and handles a like post request.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A promise that resolves when the request is handled.
 * 
 * @remarks
 * This function validates a like post request by checking if the request query matches the delete_post_schema.
 * If the validation is successful, the handleLikePost function is called to handle the request.
 * The response from the handleLikePost function is sent back to the client using the sendResponse function.
 */
export const validateLikePostRequest = async (req: Request, res: Response) => {
    await handleQueryDataRequest(delete_post_schema, req, res, true, async (data: any, token: any) => {
        await handleLikePost(token, data.postID, (code: number, data: any) => sendResponse(res, code, data))
    });
}




