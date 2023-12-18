/**
 * Importing necessary modules
 */
import React from "react";
import {AuthContext} from "../providers/AuthProvider";

/**
 * Hook to use the authentication context
 * @returns {Object} The authentication context
 */
const useAuth = () => {
    return React.useContext(AuthContext);
}

export default useAuth;