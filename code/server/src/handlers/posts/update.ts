/**
 * Updates a post in the database.
 * 
 * @param authToken - The authentication token of the user.
 * @param data - The data containing the post ID and the updated post information.
 * @param respond - The function to send the response to the client.
 * @returns void
 * 
 * @remarks
 * This function is responsible for updating a post in the database.
 * It first checks if the user is authenticated and if the post ID is valid.
 * Then, it checks if the user is the creator of the post.
 * Based on the type of the post, it updates the corresponding fields in the post object.
 * Finally, it updates the post in the database and sends a success response to the client.
 * If any error occurs during the process, an error message is logged and an error response is sent to the client.
 */
import {db_getUserByAuthToken} from "@/database/users";
import {db_deletePost, db_getChildrenForumPosts, db_getPost, db_updatePost} from "@/database/posts";

const handleUpdatePost = async (authToken: string, data: any, respond: Function) => {

    try {

        const user = await db_getUserByAuthToken(authToken);
        let post = await db_getPost(data.postID);

        if (!user) {
            respond(401, 'Please login to update post')
            return;
        }

        if (!post) {
            respond(401, 'Please specify a valid post ID.');
            return;
        }

        if (post.creatorEmail !== user.email) {
            respond(401, 'Users can only update posts they created.');
            return;
        }

        let changes = {}

        if (data.title != undefined && data.title !== post.title) {
            changes = {...changes, title: data.title};
        }

        if (data.description != undefined && data.description !== post.description) {
            changes = {...changes, description: data.description};
        }

        if (post.type === "FORUM") {
            if (data.isAnonymous != undefined && data.isAnonymous !== post.isAnonymous) {
                changes = {...changes, isAnonymous: data.isAnonymous};
            }
            if (data.images != undefined && data.images !== post.images) {
                changes = {...changes, images: data.images};
            }
        } else if (post.type === "LOST") {
            if (data.isResolved != undefined && data.isResolved !== post.isResolved) {
                changes = {...changes, isResolved: data.isResolved};
            }
            if (data.images != undefined && data.images !== post.images) {
                changes = {...changes, images: data.images};
            }
        } else if (post.type === "SALE" || post.type === "DONATE") {
            if (data.isResolved != undefined && data.isResolved !== post.isResolved) {
                changes = {...changes, isResolved: data.isResolved};
            }
            if (data.images != undefined && data.images !== post.images) {
                changes = {...changes, images: data.images};
            }
            if (data.price != undefined && data.price !== post.price) {
                changes = {...changes, price: data.price};
            }
            if (data.price != undefined && ((data.price > 0) ? "SALE" : "DONATE") !== post.type) {
                changes = {...changes, type: (data.price > 0) ? "SALE" : "DONATE"};
            }
        } else if (post.type === "BORROW") {
            if (data.duration != undefined && data.duration !== post.duration) {
                changes = {...changes, duration: data.duration};
            }
            if (data.isResolved != undefined && data.isResolved !== post.isResolved) {
                changes = {...changes, isResolved: data.isResolved};
            }
        }

        await db_updatePost(data.postID, changes)

        respond(200, "Post updated successfully");

    } catch (error) {
        console.error('Error occurred while updating post:', error);
        respond(500, 'An Error occurred during post updating. Please try again later.');
    }
};

export default handleUpdatePost