/**
 * Defines the routes for the server.
 * 
 * @remarks
 * This file contains the route definitions for the server. It sets up the routes for various endpoints such as user, authentication, post, and chat.
 * Each route is associated with a specific HTTP method and a corresponding validation function from the respective validator file.
 * The validation functions ensure that the incoming requests are valid before processing them further.
 * The routes are defined using the Express Router and are exported as the default module.
 */
import express from 'express';
import {
    validateDeleteAccountRequest,
    validateCreateUserRequest, validateUpdateUserRequest,
    validateGetUserRequest
} from "@/validation/userValidator";
import {
    validateCreatePostRequest,
    validateDeletePostRequest,
    validateGetPostsRequest, validateLikePostRequest,
    validateUpdatePostRequest
} from "@/validation/postValidator";
import {
    validateConfirmEmailRequest,
    validateForgotPasswordRequest,
    validateLoginRequest
} from "@/validation/authValidator";
import {validateGetChatsRequest} from "@/validation/chatValidator";

const router = express.Router();

router.get("/", (req, res) => res.send("ok!"))


// users
router.post("/users", validateCreateUserRequest)
router.get("/users", validateGetUserRequest)
router.patch("/users", validateUpdateUserRequest)
router.delete("/users", validateDeleteAccountRequest)

// auth
router.post("/auth/login", validateLoginRequest)
router.post("/auth/forgot", validateForgotPasswordRequest)
router.get("/auth/confirm", validateConfirmEmailRequest)

// posts
router.post("/posts", validateCreatePostRequest)
router.get("/posts", validateGetPostsRequest)
router.get("/posts/like", validateLikePostRequest)
router.patch("/posts", validateUpdatePostRequest)
router.delete("/posts", validateDeletePostRequest)

router.get("/chats", validateGetChatsRequest)

export default router;

