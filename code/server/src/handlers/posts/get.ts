/**
 * Retrieves posts based on the provided query parameters.
 * 
 * @param authToken - The authentication token of the user.
 * @param query - The query parameters for filtering and sorting the posts.
 * @param respond - The function to send the response to the client.
 * @returns void
 * 
 * @remarks
 * This function retrieves posts from the database based on the provided query parameters.
 * It first checks if the user is authenticated by validating the authentication token.
 * If the user is not authenticated, a 401 Unauthorized response is sent to the client.
 * If the user is authenticated, the function builds a filter based on the query parameters.
 * It then retrieves the posts from the database using the filter.
 * For each post, it fetches the comments if the post type is "FORUM" and adds the "isLiked" attribute to each comment.
 * It also adds the "isLiked" attribute to the post itself.
 * Anonymous comments and posts are hidden from users other than the creator.
 * The posts are sorted based on the query parameters (if provided) and sent as a response to the client.
 * If an error occurs during the process, a 500 Internal Server Error response is sent to the client.
 */
import {db_getUserByAuthToken} from "@/database/users";
import {db_getChildrenForumPosts, db_getPost, db_getPostByQuery, db_postQueryBuilder} from "@/database/posts";
import Joi from "joi";
import {Post, PostQuery} from "@/interfaces/postModel";

const handleGetPosts = async (authToken: string, query: PostQuery, respond: Function) => {
    try {

        const user = await db_getUserByAuthToken(authToken);

        if (!user) {
            respond(401, 'Please login to see posts')
            return;
        }

        const filter = db_postQueryBuilder(query)

        const posts = await db_getPostByQuery(filter);

        // fetching comments for all posts if they exist and adding isLiked attribute
        for (const post of posts) {
            if (post.type === "FORUM") {
                const comments = await db_getChildrenForumPosts(post._id)
                comments.map((comment) => {
                    // hiding anonymous comments
                    if (comment.isAnonymous && comment.creatorEmail !== user.email) {
                        comment.creatorEmail = undefined;
                    }
                    comment.isLiked = comment.likes?.includes(user.email)
                })
                post.comments = comments || []
                post.isLiked = post.likes?.includes(user.email)
            }
        }

        //hide anonymous posts
        posts.map((post) => {
            if (post.isAnonymous && post.creatorEmail !== user.email) {
                post.creatorEmail = undefined;
            }
        })

        if (query.sortByBorrowDuration) {
            posts.sort((b, a) => a.duration - b.duration);
        }

        if (query.sortByLikes) {
            posts.sort((b, a) => a.likes?.length - b.likes?.length);
        }

        if (query.sortByPrice) {
            posts.sort((b, a) => a.price - b.price);
        }

        if (query.sortByNewest) {
            posts.sort((b: Post, a: Post) => new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime());
        }

        respond(200, posts);

    } catch (error) {
        console.error('Error occurred while querying posts:', error);
        respond(500, 'An Error occurred during post fetching. Please try again later.');
    }
};

export default handleGetPosts