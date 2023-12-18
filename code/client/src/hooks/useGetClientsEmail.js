import React, {useEffect, useState} from "react";
import {handleGetUser} from "../helpers/apiHelper";
import {AuthContext} from "../providers/AuthProvider";

/**
 * Hook to get the email of the currently logged in client
 * @returns {string|null} The email of the currently logged in client, or null if no client is logged in
 */
const useGetClientsEmail = () => {
    // State to hold the email of the currently logged in client
    const [email, setEmail] = useState(null)

    // Get the isLoggedIn value from the authentication context
    const { isLoggedIn} = React.useContext(AuthContext);

    useEffect(() => {
        // Function to get the email of the currently logged in client
        const getEmail = async () => {
            // Make a request to get the user
            let res = await handleGetUser()

            // If the request was successful, set the email state to the email of the user
            if (res.status === 200) {
                setEmail(res.data.email)
            }
        }

        // Call the getEmail function
        getEmail();
    }, [isLoggedIn]); // Dependency array with isLoggedIn, so the effect runs again if isLoggedIn changes

    // Return the email of the currently logged in client
    return email
}

export default useGetClientsEmail