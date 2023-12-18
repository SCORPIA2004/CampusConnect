/**
 * Renders the router component for handling client-side routing.
 * @returns {JSX.Element} The router component.
 */
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ResetPassword from "./pages/resetPassword";
import NavBar from "./components/NavBar";
import ChangePassword from "./pages/changePassword";
import NotFoundRedirect from "./components/NotFoundRedirect";
import ProfilePage from "./pages/profile";
import SideBar from "./components/SideBar";
import PostPage from "./pages/post";
import SettingsPage from "./pages/settings";
import HelpPage from "./pages/help";
import ChatsPage from "./pages/chats";
import useGetClientsEmail from "./hooks/useGetClientsEmail";


const Router = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <SideBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/>
                <Route path="/changePassword/:authtoken" element={<ChangePassword/>}/>
                <Route path="/profile/:userEmail" element={<ProfilePage/>}/>
                <Route path="/chats" element={<ChatsPage/>}/>
                <Route path="/chats/:email" element={<ChatsPage/>}/>
                <Route path="/post/:_id" element={<PostPage/>}/>
                <Route path="/home/:postType" element={<HomePage/>}/>
                <Route path={"/settings"} element={<SettingsPage/>}/>
                <Route path={"/help"} element={<HelpPage/>} />
                <Route path="/*" element={<NotFoundRedirect/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router