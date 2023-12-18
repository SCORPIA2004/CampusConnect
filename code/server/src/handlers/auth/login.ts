/**
 * Handles the login process for a user.
 * 
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @param respond - The function to send the response.
 * 
 * @remarks
 * This function handles the login process for a user. It checks if the provided email and password are valid.
 * If the email is not found in the database, it responds with an error message "Invalid credentials.".
 * If the password does not match the encrypted password in the database, it also responds with an error message "Invalid credentials.".
 * If the user has not confirmed their email yet, it sends a confirmation email and responds with an error message "Email with link has been sent to you. Please confirm to login.".
 * If the login is successful, it responds with the user's authentication token, first name, last name, and email.
 * If an error occurs during the login process, it logs the error and responds with an error message "An error occurred during login. Please try again.".
 */
import {comparePassword} from "@/src/crypto/crypto";
import {db_getUserByEmail} from "@/database/users";
import handleSendConfirmationEmail from "@/handlers/auth/sendConfirmationEmail";
const handleLogin = async (email: string, password: string, respond: Function) => {
    try {

        const user = await db_getUserByEmail(email);

        if (!user) {
            respond(401, 'Invalid credentials.')
            return;
        }

        const passwordMatch = comparePassword(password, user.encryptedPassword);

        if (!passwordMatch) {
            respond(401, 'Invalid credentials.')
            return;
        }

        //if user still has a register token (aka not confirmed email yet)
        if (user.registerToken) {
            await handleSendConfirmationEmail(email, user.registerToken)
            respond(401, 'Email with link has been sent to you. Please confirm to login.')
            return;
        }

        respond(200, {authToken: user.authToken, firstName: user.firstName, lastName: user.lastName, email: user.email})

    } catch (error) {
        console.error('Login error:', error);
        respond(500, 'An error occurred during login. Please try again.')
    }
};

export default handleLogin