/**
 * Represents a chat component that allows users to send messages and attachments.
 * @param {Object} chat - The chat object containing user information and messages.
 * @param {Function} handleSendMessage - The function to handle sending messages.
 * @param {Function} handleClose - The function to handle closing the chat.
 * @returns {JSX.Element} The rendered chat component.
 * @remarks
 * This component provides a chat interface where users can send messages and attachments.
 * It displays the user's avatar, name, and messages in a chat slider.
 * Users can send messages by pressing the send button or pressing enter.
 * They can also attach images by clicking the paperclip icon and selecting an image file.
 * The selected image is displayed with its file name, and users can remove the attachment if needed.
 * The component uses various sub-components such as TextInput, SimpleButton, Message, UserTag, CloseButton, IconButton, ProfileBadge, toast, and ImageUploadTitleBox.
 * The chat component is designed to be used within a larger application.
 */

import TextInput from "../TextInput";
import SimpleButton from "../SimpleButton";
import Message from "./Message";
import "./styles.css"
import {useEffect, useState} from "react";
import UserTag from "../UserTag";
import CloseButton from "../CloseButton";
import {IconButton} from "@mui/material";
import {FaPaperclip} from "react-icons/fa";
import {RiSendPlaneFill} from "react-icons/ri";
import {useNavigate} from "react-router-dom";
import ProfileBadge from "../ProfileBadge";
import toast from "react-hot-toast";
import ImageUploadTitleBox from "../ImageUploadTitleBox";

const Chat = ({chat, handleSendMessage, handleClose}) => {
    const navigate = useNavigate()
    const [message, setMessage] = useState({
        text: '',
        image: undefined
    });
    const [selectedFileName, setSelectedFileName] = useState('');


    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size <= 5 * 1024 * 1024) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Data = reader.result;
                    setMessage({...message, image: base64Data});
                    setSelectedFileName(file.name); // Set the selected file name
                };
                reader.readAsDataURL(file);
            } else {
                toast.error('Image size exceeds 5MB. Please choose a smaller image.');
                e.target.value = null;
            }
        }
    };

    const handleRemoveFile = () => {
        setMessage({...message, image: undefined});
        setSelectedFileName('');
        // Optionally, you can also reset the file input if needed
        document.getElementById('file-input').value = null;
    };

    const handleTextChange = (e) => {
        setMessage({...message, text: e.target.value});
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendPress();
        }
    }

    const handleSendPress = () => {
        setMessage({text: '', image: undefined});
        setSelectedFileName('');
        handleSendMessage(message, chat.user.email);
    };


    return (
        <div className={"chat-container"}>
            <div className={"avatar-container-main"}>
                <div className={"avatar-container"}>
                    <ProfileBadge firstName={chat?.user?.firstName} lastName={chat?.user?.lastName} email={chat?.user?.email}
                                  isActive={chat?.user?.isActive}/>
                    <div className={"name"}>
                        {chat?.user?.firstName} {chat?.user?.lastName}
                        <UserTag isAnonymous={false} creatorEmail={chat?.user?.email}/>
                    </div>
                </div>
                <CloseButton onClick={handleClose}/>
            </div>
            <div className={"chat-slider"}>
                {
                    chat?.messages?.map((message, i) => {
                        return <Message message={message}
                                        isConsecutive={chat.messages[i - 1]?.isSender === message?.isSender}/>
                    })
                }
            </div>
            <div className={"chat-control"}>
                <div className={"chat-button-container"}>
                    <IconButton onClick={handleSendPress}>
                        <RiSendPlaneFill size={15}/>
                    </IconButton>
                    <IconButton>
                        <label htmlFor="file-input">
                            <FaPaperclip size={15}/>
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{display: "none"}}
                        />
                    </IconButton>
                    {selectedFileName &&
                        <ImageUploadTitleBox fileName={selectedFileName} removeFile={handleRemoveFile}/>}
                </div>
                <TextInput
                    value={message.text}
                    placeholder={"Message"}
                    onChange={handleTextChange}
                    style={{width: "95%"}}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    )
}

export default Chat;