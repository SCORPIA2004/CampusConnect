/**
 * Provides authentication functionality for the application.
 * Manages user login, logout, and user information.
 * @module AuthProvider
 */

import React, {createContext, useState, useEffect} from 'react';
import {handleGetUser} from "../helpers/apiHelper";

/**
 * Context for authentication state and functions.
 * @type {React.Context}
 */
export const AuthContext = createContext();

/**
 * Provides authentication functionality for the application.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
const AuthProvider = ({children}) => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [authToken, setAuthToken] = useState();

    /**
     * Checks if an authentication token exists in local storage.
     * If a token exists, retrieves user information and sets the authentication state.
     * @returns {Promise<void>} A Promise that resolves when the authentication check is complete.
     */
    const authTokenCheck = async () => {
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            let res = await handleGetUser()
            if (res.status === 200) {
                setLoggedIn(true)
                setEmail(res.data.email)
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setAuthToken(authToken)
            }
        }

        setLoading(false)
    };

    useEffect(() => {
        authTokenCheck();
    }, []);

    /**
     * Logs the user in and sets the authentication token in local storage.
     * @param {string} token - The authentication token.
     * @returns {void}
     */
    const login = (token) => {
        localStorage.setItem('authToken', token);
        setLoggedIn(true);
    };

    /**
     * Logs the user out and removes the authentication token from local storage.
     * @returns {void}
     */
    const logout = () => {
        localStorage.removeItem('authToken');
        setLoggedIn(false);
    };

    /**
     * Updates the authentication state by checking the authentication token.
     * @returns {void}
     */
    const update = () => {
        authTokenCheck();
    }

    return (
        <AuthContext.Provider
            value={{isLoggedIn, isLoading, email, firstName, lastName, authToken, login, logout, update}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;