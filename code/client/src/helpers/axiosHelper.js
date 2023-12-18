/**
 * Importing necessary modules
 */
import axios from "axios";

/**
 * Function to make a POST request
 * @param {string} requestUrl - The URL to make the request to
 * @param {Object} requestData - The data to send in the request
 * @returns {Promise} Promise object represents the POST request
 */
export const post = async (requestUrl, requestData) => {
    try {
        return await axios.post(requestUrl, requestData, makeConfig());
    } catch (error) {
        return error.response ; // You can choose to handle or propagate the error as needed.
    }
}

/**
 * Function to make a PATCH request
 * @param {string} requestUrl - The URL to make the request to
 * @param {Object} requestData - The data to send in the request
 * @returns {Promise} Promise object represents the PATCH request
 */
export const patch = async (requestUrl, requestData) => {
    try {
        return await axios.patch(requestUrl, requestData, makeConfig());
    } catch (error) {
        return error.response ; // You can choose to handle or propagate the error as needed.
    }
}

/**
 * Function to make a DELETE request
 * @param {string} requestUrl - The URL to make the request to
 * @param {Object} requestQuery - The query parameters to send in the request
 * @returns {Promise} Promise object represents the DELETE request
 */
export const del = async (requestUrl, requestQuery) => {
    try {
        return await axios.delete(requestUrl, makeConfig(requestQuery));
    } catch (error) {
        return error.response ; // You can choose to handle or propagate the error as needed.
    }
}

/**
 * Function to make a GET request
 * @param {string} requestUrl - The URL to make the request to
 * @param {Object} requestQuery - The query parameters to send in the request
 * @returns {Promise} Promise object represents the GET request
 */
export const get = async (requestUrl, requestQuery) => {
    try {
        return await axios.get(requestUrl, makeConfig(requestQuery));
    } catch (error) {
        return error.response ; // You can choose to handle or propagate the error as needed.
    }
}

/**
 * Function to make a configuration object for axios requests
 * @param {Object} requestQuery - The query parameters to send in the request
 * @returns {Object} The configuration object for the axios request
 */
const makeConfig = (requestQuery) => {
    const auth = localStorage.getItem("authToken")

    return {
        headers: {
            'auth': auth
        },
        params: requestQuery,
    }
}