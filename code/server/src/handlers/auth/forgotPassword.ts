/**
 * Handles the forgot password functionality.
 * 
 * @param email - The email address of the user requesting password reset.
 * @param respond - The function to send the response to the client.
 * @returns void
 * 
 * @remarks
 * This function handles the forgot password functionality. It takes the email address of the user
 * requesting password reset and a function to send the response to the client. It checks if the email
 * is linked to an existing account. If it is, it sends an email to the user with a link to reset the password.
 * If the email is not linked to any account, it sends an error response. If an error occurs during the process,
 * it sends an error response as well.
 */
import {db_getUserByEmail} from "@/database/users";
import {sendMail} from "@/src/mail";
import * as process from "process";

const CLIENT_URL=process.env.CLIENT_URL || ""
const handleForgot = async (email: string, respond: Function) => {
    try {
        const user = await db_getUserByEmail(email);
        
        if (!user) {
            respond(401, 'Invalid email. Please provide an email linked to an account.');
            return;
        }

        const html = `
            <p>To change your password, please click the link below:</p>
            <p><a href="${CLIENT_URL}/changePassword/${user.authToken}">Click here to reset your password</a></p>
        `
        await sendMail(email, 'Reset your CampusConnect password', html)
        
        respond(200, "Please check your email inbox to start password change process.");

    } catch (error) {
        console.error('Forgot password error:', error);
        respond(500, 'An error occurred during password forgot operation.');
    }
}

export default handleForgot