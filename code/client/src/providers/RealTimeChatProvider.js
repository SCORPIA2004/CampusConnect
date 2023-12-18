

/**
 * Provides real-time chat functionality for the application.
 * Manages sending and receiving messages, handling chat activity, and retrieving chat history.
 * @module RealTimeChatProvider
 */

import React, {createContext, useState, useEffect} from 'react';
import toast from "react-hot-toast";
import useSocket from "../hooks/useSocket";
import useAuth from "../hooks/useAuth";
import {handleGetChats} from "../helpers/apiHelper";

/**
 * Context for real-time chat functionality.
 * @type {React.Context}
 */
export const RealTimeChatContext = createContext();

/**
 * Provides real-time chat functionality for the application.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
const RealTimeChatProvider = ({children}) => {
    const [chats, setChats] = useState([]);
    const {socket, isConnected} = useSocket()
    const {email, isLoggedIn} = useAuth()

    /**
     * Sends a message to the specified recipient.
     * @param {Object} chat - The chat message to be sent.
     * @param {string} recipientEmail - The email address of the recipient.
     */
    const sendMessage = (chat, recipientEmail) => {
        chat.recipientEmail = recipientEmail
        socket.emit('message', chat, (res) => {
            if (res.status === 200) {
                toast.success('Message sent')
                addMessage(res.message, res.message.recipientUser, true)
            } else {
                toast.error(`${res.message}`)
            }
        })
    }

    useEffect(() => {
        if (!isLoggedIn) return;

        handleGetChats().then(res => {
            let newChats = []
            res.data.map(chat => {
                let newMessages = []
                chat.messages.map(message => {
                    const msg = {
                        text: message.text,
                        dateSent: message.dateSent,
                        image: message.image,
                        isSender: message.senderEmail === email
                    }
                    newMessages.push(msg)
                })
                const newChat = {
                    user: {
                        email: chat.participant0Email === email ? chat.participant1Email : chat.participant0Email,
                        firstName: chat.participant0Email === email ? chat.participant1FirstName : chat.participant0FirstName,
                        lastName: chat.participant0Email === email ? chat.participant1LastName : chat.participant0LastName,
                        isActive: chat.participant0Email === email ? chat.participant1Active : chat.participant0Active,
                    },
                    messages: newMessages
                }
                newChats.push(newChat)
            })
            setChats(newChats)
        }).catch(err => {
            toast.error(`${err.message}`)
        })
    }, [isLoggedIn])

    useEffect(() => {
        if (isConnected) {
            socket.on('message', recieveMessage)
            socket.on('activity', handleActivityChange)
        }
        return () => {
            if (isConnected) {
                socket.off('message', recieveMessage)
                socket.off('activity', handleActivityChange)
            }
        }
    }, [isConnected])

    /**
     * Receives a message from the socket and adds it to the chat.
     * @param {Object} message - The received message.
     */
    const recieveMessage = (message) => {
        toast(`💬 ${message.senderUser.firstName}: ${message.text}`)
        addMessage(message, message.senderUser, false)
    }

    /**
     * Handles changes in chat activity.
     * @param {Object} activity - The activity change information.
     */
    const handleActivityChange = (activity) => {
        const {email, isActive} = activity
        setChats(prevChats => {
            const updatedChats = prevChats.map(chat => {
                if (chat.user.email === email) {
                    return {
                        ...chat,
                        user: {
                            ...chat.user,
                            isActive
                        }
                    };
                }
                return chat;
            });
            return updatedChats;
        });
    }

    /**
     * Adds a message to the chat.
     * @param {Object} message - The message to be added.
     * @param {Object} user - The user associated with the message.
     * @param {boolean} isSender - Indicates if the message is sent by the user.
     */
    const addMessage = (message, user, isSender) => {
        setChats(prevChats => {
            let chatExists = false;
            const updatedChats = prevChats.map(chat => {
                if (chat.user.email === user.email) {
                    chatExists = true;
                    // Update the messages array by adding the new message
                    delete message.recipientUser
                    delete message.senderUser
                    message.isSender = isSender
                    return {
                        ...chat,
                        messages: [...chat.messages, message],
                    };
                }
                return chat;
            });

            // If chat doesn't exist, add a new chat
            if (!chatExists) {
                delete message.recipientUser
                delete message.senderUser
                message.isSender = isSender
                updatedChats.push({
                    user,
                    messages: [message],
                });
            }

            return updatedChats;
        });
    }

    return (
        <RealTimeChatContext.Provider value={{chats, sendMessage}}>
            {children}
        </RealTimeChatContext.Provider>
    );
};

export default RealTimeChatProvider;