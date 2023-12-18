/**
 * Renders the ChatsPage component.
 * 
 * This component displays a list of user chats and allows the user to select a chat to view and send messages.
 * It uses the useChat hook to manage the chat state and the useAuth hook to check if the user is logged in.
 * The component also makes use of the UserChatCard and Chat components to display the chat list and individual chats.
 * 
 * @returns {JSX.Element} The rendered ChatsPage component.
 */
import React, { useEffect, useState } from "react";
import "./styles.css";
import useChat from "../../hooks/useChat";
import UserChatCard from "../../components/UserChatCard";
import Chat from "../../components/Chat";
import { handleGetUserByEmail } from "../../helpers/apiHelper";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ChatsPage = () => {
    const { chats, sendMessage } = useChat();
    const [currentChat, setCurrentChat] = useState();
    const { isLoggedIn, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const email = window.location.href.split("/")[4];
        if (email) {
            setChat(email);
        }
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (!isLoggedIn) {
                navigate("/login");
            }
        }
    }, [isLoading]);

    /**
     * Handles sending a message to the current chat.
     * 
     * @param {string} message - The message to send.
     * @param {string} recipient - The recipient of the message.
     */
    const handleSendMessage = (message, recipient) => {
        sendMessage(message, recipient);
    };

    /**
     * Renders the list of user chats.
     * 
     * @returns {JSX.Element[]} An array of UserChatCard components representing the user chats.
     */
    const renderChats = () =>
        chats.map((chat) => (
            <UserChatCard
                email={chat.user.email}
                firstName={chat.user.firstName}
                lastName={chat.user.lastName}
                lastMessage={chat?.messages[chat.messages.length - 1]}
                isActive={chat.user.isActive}
                onClick={() => setChat(chat.user.email)}
            />
        ));

    /**
     * Sets the current chat based on the given email.
     * 
     * If a chat with the given email already exists in the chats array, it sets that chat as the current chat.
     * Otherwise, it makes an API call to get the user with the given email and sets a new chat with that user as the current chat.
     * 
     * @param {string} email - The email of the user to set as the current chat.
     */
    const setChat = (email) => {
        console.log("set chat to " + email);
        if (chats.find((chat) => chat.user.email === email) !== undefined) {
            setCurrentChat(chats.find((chat) => chat.user.email === email));
        } else {
            handleGetUserByEmail(email)
                .then((resp) => {
                    if (resp.status === 200) {
                        setCurrentChat({
                            user: resp.data,
                            messages: [],
                        });
                    }
                })
                .catch((e) => {
                    toast.error(e);
                });
        }
    };

    return (
        <div className={"main-container"}>
            {currentChat ? (
                <Chat
                    chat={currentChat}
                    handleSendMessage={handleSendMessage}
                    handleClose={() => setCurrentChat(undefined)}
                />
            ) : (
                <div className={"chat-list"}>
                    <div className={"chat-header"}>
                        <h1>✉️ ️Chats</h1>
                    </div>
                    {renderChats()}
                </div>
            )}
        </div>
    );
};

export default ChatsPage;
