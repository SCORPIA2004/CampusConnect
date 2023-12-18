import {SocketContext} from "../providers/SocketProvider";
import {useContext} from "react";

/**
 * Hook to use the socket context
 * @returns {Object} The socket context
 */
const useSocket = () => {
    return useContext(SocketContext);
}

export default useSocket;