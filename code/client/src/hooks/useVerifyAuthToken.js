import {useEffect, useState} from "react";
import {handleGetUser} from "../helpers/apiHelper";

/**
 * Hook to verify the authentication token stored in local storage
 * @returns {Array} An array containing two elements:
 *                  - isValid: A boolean indicating whether the authentication token is valid
 *                  - isLoading: A boolean indicating whether the verification process is still ongoing
 */
const useVerifyAuthToken = () => {
    // State to hold whether the authentication token is valid
    const [isValid, setValid] = useState(false)

    // State to hold whether the verification process is still ongoing
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        // Function to check the validity of the authentication token
        const authTokenCheck = async () => {
            // Get the authentication token from local storage
            const authToken = localStorage.getItem('authToken');

            // If there is an authentication token, verify it
            if (authToken) {
                // Make a request to get the user associated with the authentication token
                let res = await handleGetUser()

                // If the request was successful, set isValid to true
                if (res.status === 200) {
                    setValid(true)
                }
            }

            // Set isLoading to false to indicate that the verification process is complete
            setLoading(false)
        }

        // Call the authTokenCheck function
        authTokenCheck();
    }, []); // Empty dependency array so the effect only runs once on mount

    // Return whether the authentication token is valid and whether the verification process is still ongoing
    return [isValid, isLoading]
}

export default useVerifyAuthToken