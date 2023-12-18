/**
 * Importing toast from react-hot-toast for toast notifications
 */
import toast from "react-hot-toast";

/**
 * Function to perform a request and display a toast notification based on the response
 * @param {Function} actionFunction - The function to perform the request
 * @param {Object} functionParams - The parameters to pass to the actionFunction
 * @param {string} loadingMessage - The message to display while the request is loading
 */
export const performRequestToast = async (actionFunction, functionParams, loadingMessage) => {
    // Display a loading toast notification
    const loadingToast = toast.loading(loadingMessage)

    // Perform the request
    const res = await actionFunction(functionParams)

    // Remove the loading toast notification
    toast.remove(loadingToast)

    // If the request was successful, display a success toast notification
    // Otherwise, display an error toast notification
    if (res.status === 200) {
        toast.success(res.data)
    } else {
        toast.error(res.data)
    }
}