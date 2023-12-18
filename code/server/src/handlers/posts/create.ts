/**
 * This file contains the handler function for creating a new post.
 * 
 * @param authToken - The authentication token of the user creating the post.
 * @param data - The data for the new post.
 * @param respond - The function to send the response back to the client.
 * @returns void
 * 
 * @remarks
 * This handler function is responsible for creating a new post based on the provided data.
 * It first checks if the user is authenticated by validating the authentication token.
 * If the user is not authenticated, it sends a 401 Unauthorized response.
 * If the user is authenticated, it generates a unique ID for the post and creates a base post object.
 * Depending on the type of the post, it creates a specific type of post object with additional properties.
 * If the post type is "FORUM", it checks if the parent post ID is valid and not a comment on a comment.
 * It compresses the images if any and creates a new forum post object.
 * If the post type is "SALE" or "DONATE", it creates a new sale or donate post object with the price and images.
 * If the post type is "LOST", it creates a new lost post object with the images.
 * If the post type is "BORROW", it creates a new borrow post object with the duration.
 * It then adds the new post to the database and sends a 200 OK response with the post ID.
 * If an error occurs during the process, it logs the error and sends a 500 Internal Server Error response.
 */
import {generateSmallRandomToken} from "@/src/crypto/crypto";
import {db_getUserByAuthToken} from "@/database/users";
import {BasePost, ForumPost, Post} from "@/interfaces/postModel";
import {db_addPost, db_getPost} from "@/database/posts";
import sharp from "sharp";
import {compressImage} from "@/src/compression";

const handleCreatePost = async (authToken: string, data: any, respond: Function) => {

    try {

        const user = await db_getUserByAuthToken(authToken);

        if (!user) {
            respond(401, 'Please login to create post')
            return;
        }

        const _id = generateSmallRandomToken()

        let base: BasePost = {
            _id,
            title: data.title,
            description: data.description,
            creatorEmail: user.email,
            dateCreated: new Date(),
            type: data.type,
        };

        let newPost: Post;

        if (data.type === "FORUM") {

            // check whether parent post is valid or not (also disabling nested comments)
            if (data.parentPostID) {
                const parentPost = await db_getPost(data.parentPostID)
                if (parentPost) {
                    if (parentPost.parentPostID) {
                        respond(400, "Can't comment on a comment")
                        return;
                    }
                    if (parentPost.type !== "FORUM") {
                        respond(400, "Invalid parent post ID")
                        return;
                    }
                } else {
                    respond(400, "Invalid parent post ID")
                    return;
                }
            }

            const compressedImages = data.images ? await Promise.all(data.images.map(compressImage)) : [];

            newPost = {
                ...base,
                type: "FORUM",
                isAnonymous: data.isAnonymous,
                parentPostID: data.parentPostID,
                likes: [],
                images: compressedImages,
            }
        } else if (data.type === "SALE" || data.type === "DONATE") {
            newPost = {
                ...base,
                type: (data.price > 0) ? "SALE" : "DONATE",
                images: data.images,
                price: data.price,
                isResolved: false,
            }
        } else if (data.type === "LOST") {
            newPost = {
                ...base,
                type: "LOST",
                images: data.images,
                isResolved: false,
            }
        } else {
            newPost = {
                ...base,
                type: "BORROW",
                duration: data.duration,
                isResolved: false,
            }
        }

        await db_addPost(newPost);

        respond(200, _id);

    } catch (error) {
        console.error('Post creation error:', error);
        respond(500, 'An error occurred during Post creation. Please try again.');
    }
};

export default handleCreatePost