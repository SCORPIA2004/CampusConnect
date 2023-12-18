

/**
 * Provides a socket connection to the server for real-time communication.
 * @module SocketProvider
 */

import React, {createContext, useState, useEffect} from 'react';
import {AuthContext} from "./AuthProvider";
import {io} from "socket.io-client";
import toast from "react-hot-toast";

const API_URL = "https://campus-connect-undefined-api.onrender.com";
let socket;

/**
 * Context for socket connection and status.
 * @typedef {Object} SocketContext
 * @property {Socket} socket - The socket connection.
 * @property {boolean} isConnected - The status of the socket connection.
 */

export const SocketContext = createContext();

/**
 * Provides a socket connection to the server for real-time communication.
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @returns {ReactNode} The wrapped child components.
 */
const SocketProvider = ({children}) => {
    const {isLoggedIn, authToken} = React.useContext(AuthContext);
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {
            socket = io(API_URL, {query: {token: authToken}})

            socket.on('connect', () => {
                setIsConnected(true)
                socket.on('disconnect', () => {
                    toast.error('Disconnected from socket server')
                    setIsConnected(false)
                })
            })
        }
    }, [isLoggedIn, authToken])

    return (
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;