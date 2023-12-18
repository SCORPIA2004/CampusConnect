/**
 * Provides cryptographic functions for generating random tokens and encrypting passwords.
 * 
 * @remarks
 * This module contains functions for generating random tokens of different sizes and encrypting passwords using a salted hash algorithm.
 * It can be used in applications that require secure token generation or password encryption.
 * 
 * @example
 * ```typescript
 * import { generateRandomToken, encryptPassword } from "./crypto";
 * 
 * const token = generateRandomToken(); // Generates a random token
 * const encryptedPassword = encryptPassword("password"); // Encrypts a password
 * ```
 */
import {randomBytes, pbkdf2Sync} from "crypto";

const SALT_TOKEN = "SUIoisIU&7*%SHADN*(&(@0hihdiuNKJANDKJna@EU@#_YSN"

/**
 * Generates a random token of 32 bytes.
 * 
 * @returns The generated random token as a hexadecimal string.
 */
export const generateRandomToken = () => {
    return randomBytes(32).toString('hex');
};

/**
 * Generates a small random token of 8 bytes.
 * 
 * @returns The generated small random token as a hexadecimal string.
 */
export const generateSmallRandomToken = () => {
    return randomBytes(8).toString('hex');
};

/**
 * Encrypts a password using a salted hash algorithm.
 * 
 * @param password - The password to be encrypted.
 * @returns The encrypted password as a hexadecimal string.
 */
export const encryptPassword = (password: string) => {
    return pbkdf2Sync(password, SALT_TOKEN, 1000, 64, 'sha512').toString('hex')
};

/**
 * Compares a password with a hashed password.
 * 
 * @param password - The password to be compared.
 * @param hashedPassword - The hashed password to compare against.
 * @returns True if the password matches the hashed password, false otherwise.
 */
export const comparePassword = (password: string, hashedPassword: string) => {
    return encryptPassword(password) === hashedPassword;
};