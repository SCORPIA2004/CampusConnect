/**
 * Handles the creation of a new user.
 * 
 * @param data - The user data including email, password, first name, and last name.
 * @param respond - The function to send the response to the client.
 * @returns void
 * 
 * @remarks
 * This function is responsible for creating a new user in the system.
 * It checks if the user already exists in the database, generates authentication and registration tokens,
 * encrypts the password, and adds the user to the database.
 * It also sends a confirmation email to the user's email address.
 * If any error occurs during the process, an error message is logged and an appropriate response is sent to the client.
 */
import {encryptPassword, generateRandomToken} from "@/src/crypto/crypto";
import {db_addUser, db_getUserByEmail} from "@/database/users";
import handleSendConfirmationEmail from "@/handlers/auth/sendConfirmationEmail";

const handleCreateUser = async (data: any, respond: Function) => {
    try {

        const existingUser = await db_getUserByEmail(data.email);

        if (existingUser) {
            respond(401, 'User already exists.');
            return;
        }

        const authToken = generateRandomToken();
        const registerToken = generateRandomToken()
        const encryptedPassword = encryptPassword(data.password);
        const _id = generateRandomToken();

        await db_addUser({_id, email: data.email, authToken, encryptedPassword, registerToken, firstName: data.firstName, lastName: data.lastName});

        await handleSendConfirmationEmail(data.email, registerToken)

        respond(200, 'Your account has been successfully created! Please check your email inbox for a verification message.');

    } catch (error) {
        console.error('Registration error:', error);
        respond(500, 'An error occurred during registration. Please try again.');
    }
};

export default handleCreateUser