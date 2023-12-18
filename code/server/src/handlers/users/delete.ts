/**
 * Deletes a user account by their authentication token.
 * 
 * @param authToken - The authentication token of the user.
 * @param respond - The function to send the response to the client.
 * @returns void
 * 
 * @remarks
 * This function handles the deletion of a user account based on their authentication token.
 * It first retrieves the user from the database using the authentication token.
 * If the user is not found, it sends a 401 Unauthorized response to the client.
 * If the user is found, it deletes the user from the database using the authentication token.
 * Finally, it sends a 200 OK response to the client indicating that the account has been deleted successfully.
 * If any error occurs during the process, it sends a 500 Internal Server Error response to the client.
 */
import {db_deleteUserByAuthToken, db_getUserByAuthToken} from "@/database/users";

const handleDeleteUser = async (authToken: string, respond: Function) => {

    try {

        const user = await db_getUserByAuthToken(authToken);

        if (!user) {
            respond(401, 'Invalid auth token. Please login again.');
            return;
        }

        await db_deleteUserByAuthToken(authToken)

        respond(200, "Account deleted successfully");

    } catch (error) {
        console.error('Error occurred while deleting account:', error);
        respond(500, 'An Error occurred during account deletion. Please try again later.');
    }
};

export default handleDeleteUser