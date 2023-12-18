/**
 * Importing necessary modules and constants
 */
import {post, del, patch, get} from "./axiosHelper.js"
import {
    CHANGE_USER_REQ_URL,
    DELETE_USER_REQ_URL,
    FORGOT_PASSWORD_REQ_URL,
    LOGIN_REQ_URL,
    CREATE_USER_REQ_URL,
    GET_USER_REQ_URL,
    GET_POSTS_REQ_URL,
    CREATE_POST_REQ_URL,
    LIKE_POST_REQ_URL,
    UPDATE_POST_REQ_URL,
    DELETE_POST_REQ_URL, GET_CHATS_REQ_URL
} from "./urlHelper";

/**
 * Function to create a new user
 * @param {string} firstName - First name of the user
 * @param {string} lastName - Last name of the user
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Promise} Promise object represents the post request
 */
export const handleCreateUser = async (firstName, lastName, email, password) => {
    const body = {firstName, lastName, email, password}
    return post(CREATE_USER_REQ_URL, body)
}
/**
 * Function to log in a user
 * @param {string} email - Email of the user
 * @param {string} password - Password of the user
 * @returns {Promise} Promise object represents the post request
 */
export const handleLogin = (email, password) => {
    const body = {email, password}
    return post(LOGIN_REQ_URL, body)
}

/**
 * Function to get the current user
 * @returns {Promise} Promise object represents the get request
 */
export const handleGetUser = () => {
    return get(GET_USER_REQ_URL)
}

/**
 * Function to get a user by email
 * @param {string} email - Email of the user
 * @returns {Promise} Promise object represents the get request
 */
export const handleGetUserByEmail = (email) => {
    return get(GET_USER_REQ_URL, {email})
}

/**
 * Function to get posts with a query
 * @param {Object} query - Query parameters for the get request
 * @returns {Promise} Promise object represents the get request
 */
export const handleGetPosts = (query) => {
    return get(GET_POSTS_REQ_URL, query)
}

/**
 * Function to get chats
 * @returns {Promise} Promise object represents the get request
 */
export const handleGetChats = () => {
    return get(GET_CHATS_REQ_URL)
}

/**
 * Function to make a comment
 * @param {string} postID - ID of the post to comment on
 * @param {string} commentText - Text of the comment
 * @param {boolean} isAnonymous - Whether the comment is anonymous or not
 * @returns {Promise} Promise object represents the post request
 */
export const handleMakeComment = (postID, commentText, isAnonymous = false) => {
    const body = {type: "FORUM", parentPostID: postID, title: commentText, isAnonymous}
    return post(CREATE_POST_REQ_URL, body)
}

/**
 * Function to like a post
 * @param {string} postID - ID of the post to like
 * @returns {Promise} Promise object represents the get request
 */
export const handleLikePost = (postID) => {
    return get(LIKE_POST_REQ_URL, {postID})
}

/**
 * Function to create a post
 * @param {string} type - Type of the post
 * @param {string} title - Title of the post
 * @param {string} description - Description of the post
 * @param {boolean} isAnonymous - Whether the post is anonymous or not
 * @param {string} parentPostID - ID of the parent post
 * @param {Array} images - Array of images for the post
 * @param {number} duration - Duration of the post
 * @param {number} price - Price of the post
 * @returns {Promise} Promise object represents the post request
 */
export const handleCreatePost = (type, title, description = null, isAnonymous = null,
                                 parentPostID = null, images = null, duration = null, price = null) => {
    const body = {
        type: type,
        title: title,
        description: description,
        isAnonymous: isAnonymous,
        parentPostID: parentPostID,
        images: images,
        duration: duration,
        price: price
    };

    // Filter out properties with null values
    const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([key, value]) => value !== null && value !== undefined)
    );

    return post(CREATE_POST_REQ_URL, filteredBody);
}

/**
 * Function to update a post
 * @param {string} postID - ID of the post to update
 * @param {boolean} isAnonymous - Whether the post is anonymous or not
 * @param {string} title - Title of the post
 * @param {string} description - Description of the post
 * @param {Array} images - Array of images for the post
 * @param {number} duration - Duration of the post
 * @param {number} price - Price of the post
 * @param {boolean} isResolved - Whether the post is resolved or not
 * @returns {Promise} Promise object represents the patch request
 */
export const handleUpdatePost = (postID, isAnonymous = null, title = null, description = null, images = null, duration = null, price = null, isResolved = null) => {
    const body = {
        postID: postID,
        isAnonymous: isAnonymous,
        title: title,
        description: description,
        images: images,
        duration: duration,
        price: price,
        isResolved: isResolved
    };

    // Filter out properties with null values
    const filteredBody = Object.fromEntries(
        Object.entries(body).filter(([key, value]) => value !== null && value !== undefined)
    );

    console.log(filteredBody)

    return patch(UPDATE_POST_REQ_URL, filteredBody);
}

/**
 * Function to delete a post
 * @param {string} postID - ID of the post to delete
 * @returns {Promise} Promise object represents the delete request
 */
export const handleDeletePost = (postID) => {
    return del(DELETE_POST_REQ_URL, {postID})
}

/**
 * Function to delete an account
 * @returns {Promise} Promise object represents the delete request
 */
export const handleDeleteAccount = () => {
    return del(DELETE_USER_REQ_URL)
}

/**
 * Function to handle forgot password
 * @param {string} email - Email of the user
 * @returns {Promise} Promise object represents the post request
 */
export const handleForgotPassword = (email) => {
    const body = {email}
    return post(FORGOT_PASSWORD_REQ_URL, body)
}

/**
 * Function to update a user
 * @param {string} firstName - First name of the user
 * @param {string} lastName - Last name of the user
 * @param {string} password - Password of the user
 * @returns {Promise} Promise object represents the patch request
 */
export const handleUpdateUser = (firstName, lastName, password) => {
    const body = {firstName, lastName, password}
    return patch(CHANGE_USER_REQ_URL, body)
}
