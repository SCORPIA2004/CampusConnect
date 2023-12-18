/**
 * Importing necessary modules
 */
import React from "react";
import {RealTimeChatContext} from "../providers/RealTimeChatProvider";

/**
 * Hook to use the real-time chat context
 * @returns {Object} The real-time chat context
 */
const useChat = () => {
    return React.useContext(RealTimeChatContext);
}

export default useChat;