/**
 * Handles the like functionality for a post.
 * 
 * @param authToken - The authentication token of the user.
 * @param postID - The ID of the post to be liked.
 * @param respond - The function to respond to the request.
 * 
 * @remarks
 * This function handles the like functionality for a post. It checks if the user is authenticated,
 * if the post ID is valid, and then updates the post's likes accordingly. The function responds with
 * the updated like status of the post.
 */
import {db_getUserByAuthToken} from "@/database/users";
import {db_getPost, db_updatePost} from "@/database/posts";

const handleLikePost = async (authToken: string, postID: string, respond: Function) => {

    try {

        const user = await db_getUserByAuthToken(authToken);
        let post = await db_getPost(postID);
        let isLiked = false;

        if (!user) {
            respond(401, 'Please login to update post')
            return;
        }

        if (!post) {
            respond(401, 'Please specify a valid post ID.');
            return;
        }

        let changes = {}

        if (post.likes.includes(user.email)) {
            isLiked = false;
            changes = {
                likes: post.likes.filter((email: string) => email !== user.email)
            }
        } else {
            isLiked = true;
            changes = {
                likes: [...post.likes, user.email]
            }
        }

        await db_updatePost(postID, changes)

        respond(200, isLiked);

    } catch (error) {
        console.error('Error occurred while updating post:', error);
        respond(500, 'An Error occurred during post updating. Please try again later.');
    }
};

export default handleLikePost