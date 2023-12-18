/**
 * Deletes a post from the database.
 * 
 * @param authToken - The authentication token of the user.
 * @param postID - The ID of the post to be deleted.
 * @param respond - The function to send the response to the client.
 * 
 * @remarks
 * This function handles the deletion of a post from the database.
 * It first verifies the user's authentication token and checks if the user exists.
 * Then, it retrieves the post from the database using the provided post ID.
 * If the user or the post does not exist, an appropriate error message is sent as a response.
 * If the user is not the creator of the post, an error message is sent as a response.
 * If all checks pass, the post is deleted from the database.
 * Finally, a success message is sent as a response.
 * If an error occurs during the process, an error message is logged and an error response is sent.
 */
import {db_getUserByAuthToken} from "@/database/users";
import {db_deletePost, db_getPost} from "@/database/posts";

const handleDeletePost = async (authToken: string, postID: string, respond: Function) => {

    try {

        const user = await db_getUserByAuthToken(authToken);
        const post = await db_getPost(postID);

        if (!user) {
            respond(401, 'Please login to delete post')
            return;
        }

        if (!post) {
            respond(401, 'Please specify a valid post to delete.');
            return;
        }

        if (post.creatorEmail !== user.email) {
            respond(401, 'Users can only delete posts they created.');
            return;
        }

        await db_deletePost(postID)

        respond(200, "Post deleted successfully");

    } catch (error) {
        console.error('Error occurred while deleting post:', error);
        respond(500, 'An Error occurred during post deletion. Please try again later.');
    }
};

export default handleDeletePost