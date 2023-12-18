/**
 * Represents the User model interface.
 * 
 * @remarks
 * This interface defines the structure of a User object, which includes properties such as _id, email, firstName, lastName, authToken, encryptedPassword, and registerToken.
 * The User model is used to store and retrieve user information in the application.
 */
export default interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    authToken: string;
    encryptedPassword: string;
    registerToken: string; //token used to confirm email, if null user is already verified
}