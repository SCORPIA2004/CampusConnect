/**
 * This file contains functions for interacting with the user collection in the database.
 * It provides functions for adding, retrieving, updating, and deleting user documents.
 * The functions use the userCollection object from the database/index module.
 * The userCollection object represents the MongoDB collection for storing user documents.
 */

import {userCollection} from "@/database/index";
import User from "@/interfaces/userModel";

/**
 * Adds a new user document to the user collection.
 * 
 * @param user - The user object to be added.
 * @returns A promise that resolves when the user document is successfully added.
 */
export const db_addUser = async (user: User) => {
    await userCollection.insertOne(user)
}

/**
 * Retrieves a user document from the user collection based on the email.
 * 
 * @param email - The email of the user to be retrieved.
 * @returns A promise that resolves with the user document if found, or null if not found.
 */
export const db_getUserByEmail = async (email: string) => {
    return await userCollection.findOne({email: email});
}

/**
 * Retrieves a user document from the user collection based on the authentication token.
 * 
 * @param authToken - The authentication token of the user to be retrieved.
 * @returns A promise that resolves with the user document if found, or null if not found.
 */
export const db_getUserByAuthToken = async (authToken : string) => {
    return await userCollection.findOne({authToken: authToken});
}

/**
 * Deletes a user document from the user collection based on the authentication token.
 * 
 * @param authToken - The authentication token of the user to be deleted.
 * @returns A promise that resolves when the user document is successfully deleted.
 */
export const db_deleteUserByAuthToken = async (authToken : string) => {
    await userCollection.deleteOne({ authToken: authToken });
}

/**
 * Retrieves a user document from the user collection based on the register token.
 * 
 * @param registerToken - The register token of the user to be retrieved.
 * @returns A promise that resolves with the user document if found, or null if not found.
 */
export const db_getUserByRegisterToken = async (registerToken : string) => {
    return await userCollection.findOne({registerToken: registerToken});
}

/**
 * Sets the "registerToken" field of a user document to null.
 * 
 * @param registerToken - The register token of the user to be confirmed.
 * @returns A promise that resolves when the user document is successfully updated.
 */
export const db_setUserConfirmed = async (registerToken: string) => {
    await userCollection.updateOne({ registerToken: registerToken }, {
        $unset: {
            registerToken: true,
        }
    });
}

/**
 * Updates the password of a user document based on the authentication token.
 * 
 * @param authToken - The authentication token of the user.
 * @param password - The new password to be set.
 * @returns A promise that resolves when the user document is successfully updated.
 */
export const db_updatePassword = async (authToken : string, password: string) => {
    await userCollection.updateOne({ authToken: authToken }, {
        $set: {
            encryptedPassword: password,
        }
    });
}

/**
 * Updates the fields of a user document based on the authentication token.
 * 
 * @param authToken - The authentication token of the user.
 * @param changes - The changes to be applied to the user document.
 * @returns A promise that resolves when the user document is successfully updated.
 */
export const db_updateUser = async (authToken : string, changes: any) => {
    await userCollection.updateOne({ authToken: authToken }, {
        $set: changes
    });
}