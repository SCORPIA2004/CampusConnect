/**
 * Renders the main application component and sets up the necessary providers.
 * @remarks
 * This file serves as the entry point for the client-side React application.
 * It imports the necessary dependencies, sets up the providers, and renders the main Router component.
 * The AuthProvider, SocketProvider, and RealTimeChatProvider are used to provide authentication, socket communication, and real-time chat functionality to the application.
 * The Toaster component is used to display toast notifications in the top-left corner of the screen.
 * The Router component handles the routing and rendering of different pages in the application.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router";
import NavBar from "./components/NavBar";
import {Toaster} from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider";
import RealTimeChatProvider from "./providers/RealTimeChatProvider";
import SocketProvider from "./providers/SocketProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthProvider>
        <SocketProvider>
            <RealTimeChatProvider>
                <Toaster position={"top-left"} reverseOrder={true}/>
                <Router/>
            </RealTimeChatProvider>
        </SocketProvider>
    </AuthProvider>
);
