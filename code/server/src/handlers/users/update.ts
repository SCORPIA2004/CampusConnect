/**
 * Updates user information based on the provided authentication token and data.
 * 
 * @param authToken - The authentication token of the user.
 * @param data - The data containing the updated user information.
 * @param respond - The function to respond to the update request.
 * 
 * @remarks
 * This function is responsible for updating user information in the database.
 * It first verifies the authentication token and checks if the user exists.
 * If the user exists, it checks for changes in the provided data and updates the corresponding fields.
 * The function also encrypts the password if provided in the data.
 * Finally, it updates the user in the database and responds with the appropriate status and message.
 * If any error occurs during the update process, an error message is logged and an error response is sent.
 */
import {encryptPassword} from "@/src/crypto/crypto";
import {db_getUserByAuthToken, db_updateUser} from "@/database/users";

const handleUpdateUser = async (authToken: string, data: any, respond: Function) => {
    try {

        const user = await db_getUserByAuthToken(authToken);

        if (!user) {
            respond(401, 'Invalid auth token. Please login again.');
            return;
        }
        let changes = {}

        if (data.firstName && data.firstName !== user.firstName) {
            changes = { ...changes, firstName: data.firstName };
        }
        if (data.lastName && data.lastName !== user.lastName) {
            changes = { ...changes, lastName: data.lastName };
        }
        if (data.password) {
            const encryptedPassword = encryptPassword(data.password);
            changes = { ...changes, encryptedPassword };
        }

        await db_updateUser(authToken, changes);

        respond(200, 'Your account has been updated successfully');

    } catch (error) {
        console.error('Account update error:', error);
        respond(500, 'An error occurred during account update. Please try again.');
    }
};

export default handleUpdateUser