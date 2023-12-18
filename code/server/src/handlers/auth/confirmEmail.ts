/**
 * Handles the confirmation of user email.
 * 
 * @param registerToken - The registration token sent to the user's email.
 * @param respond - The function to send the response to the client.
 * 
 * @remarks
 * This function is responsible for handling the confirmation of user email.
 * It takes the registration token as input and checks if the token is valid.
 * If the token is valid, the user's email is confirmed in the database.
 * If the token is invalid, an error message is sent to the client.
 * If an error occurs during the confirmation process, an error message is logged and sent to the client.
 */
import {db_getUserByRegisterToken, db_setUserConfirmed} from "@/database/users";

const handleConfirmEmail = async (registerToken: string, respond: Function) => {
    try {
        const user = await db_getUserByRegisterToken(registerToken);

        if (!user) {
            respond(401, 'Invalid confirm link. Please try again later.');
            return;
        }

        await db_setUserConfirmed(registerToken)

        respond(200, "Email confirmed successfully!");

    } catch (error) {
        console.error('Email confirmation error:', error);
        respond(500, 'An error occurred during email confirmation.');
    }
};

export default handleConfirmEmail