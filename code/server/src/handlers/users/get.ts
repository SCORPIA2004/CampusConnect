/**
 * Retrieves user information based on email or authentication token.
 * 
 * @param email - The email of the user. If provided, the function retrieves the user by email.
 * @param authToken - The authentication token of the user. If provided, the function retrieves the user by authentication token.
 * @param respond - The function to respond with the user information or error.
 * 
 * @remarks
 * This function is responsible for handling the request to retrieve user information.
 * It first checks if the user exists based on the provided email or authentication token.
 * If the user does not exist, it responds with an appropriate error message.
 * If the user exists, it checks if the user is active or not.
 * It then responds with the user information including first name, last name, email, and active status.
 * If an error occurs during the process, it logs the error and responds with an error message.
 */
import {db_getUserByAuthToken, db_getUserByEmail} from "@/database/users";
import {activeUsers} from "@/src/server/socketRoutes";

const handleGetUser = async (email: string, authToken: string, respond: Function) => {
    try {
        const user = email ? await db_getUserByEmail(email) : await db_getUserByAuthToken(authToken);

        if (!user) {
            respond(401, email ? 'Invalid email. Please provide a correct email.' : 'Please login to get user');
            return;
        }

        if (activeUsers.has(user.email)) {
            respond(200, {firstName: user.firstName, lastName: user.lastName, email: user.email, isActive: true});
        }
        else {
            respond(200, {firstName: user.firstName, lastName: user.lastName, email: user.email, isActive: false});
        }

    } catch (error) {
        console.error('Auth token verification error:', error);
        respond(500, 'An error occurred during users token verification.');
    }
};

export default handleGetUser