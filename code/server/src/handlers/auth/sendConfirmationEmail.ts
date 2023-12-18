/**
 * Sends a confirmation email to the specified email address with a registration token.
 * 
 * @param email - The email address to send the confirmation email to.
 * @param registerToken - The registration token to include in the confirmation email.
 * @returns A Promise that resolves when the email is sent successfully.
 * 
 * @remarks
 * This function sends a confirmation email to the specified email address with a registration token.
 * The email contains a link that the user can click to activate their account.
 * The link includes the registration token as a query parameter.
 * The email is sent using the sendMail function from the "@/src/mail" module.
 * The API_URL environment variable is used to construct the link URL.
 * If the API_URL environment variable is not set, an empty string is used as the API URL.
 * The function returns a Promise that resolves when the email is sent successfully.
 */
import {sendMail} from "@/src/mail";
import * as process from "process";

const API_URL=process.env.API_URL || ""
const handleSendConfirmationEmail = async (email: string, registerToken: string) => {

    const html = `
            <p>To confirm your email and activate your CampusConnect account, please click the link below:</p>
            <p><a href="${API_URL}/auth/confirm/?registerToken=${registerToken}">Click here to activate your account</a></p>
        `

    await sendMail(email, 'Confirm your CampusConnect account', html)
}

export default handleSendConfirmationEmail