/**
 * This file contains the implementation of the CreateLostPostPopup component.
 * The component is responsible for creating a new lost post or updating an existing one.
 * It allows the user to enter a title, description, and upload images for the post.
 * The component uses the handleCreatePost and handleUpdatePost functions from the apiHelper module to interact with the server.
 * If the user is creating a new post, the handleCreatePostClick function is called.
 * If the user is updating an existing post, the handleUpdatePostClick function is called.
 * The component also uses the TextInput, IconButton, ImageUploadTitleBox, TextArea, and SimpleButton components for the UI.
 * The isMobile hook is used to determine if the device is a mobile device.
 * The component receives the setPopupOpen, reloadPosts, isEditing, and post props from its parent component.
 * The title, postContent, and selectedFiles states are used to store the user input and selected images.
 * The fileInputRef is used to reference the file input element for uploading images.
 * The handleTitleChange and handlePostContentChange functions are used to update the title and postContent states.
 * The handleCreatePostClick function is called when the user clicks the create post button.
 * It performs validation checks, reads the selected image files as base64 URLs, and calls the handleCreatePost function to create the post.
 * The handleUpdatePostClick function is called when the user clicks the update post button.
 * It performs validation checks, reads the selected image files as base64 URLs, and calls the handleUpdatePost function to update the post.
 * If any errors occur during the process, toast messages are displayed to the user.
 */


import React, {useRef, useState} from 'react';
import './styles.css';
import useCheckMobile from "../../hooks/useCheckMobile";
import toast from "react-hot-toast";
import {handleCreatePost, handleUpdatePost} from "../../helpers/apiHelper";
import TextInput from "../TextInput";
import {IconButton} from "@mui/material";
import {FaRegFileImage} from "react-icons/fa";
import ImageUploadTitleBox from "../ImageUploadTitleBox";
import TextArea from "../TextArea";
import SimpleButton from "../SimpleButton";

const CreateLostPostPopup = ({setPopupOpen, reloadPosts, isEditing, post}) => {
    const [title, setTitle] = useState(post?.title);
    const [postContent, setPostContent] = useState(post?.description);
    const [selectedFiles, setSelectedFiles] = useState(post?.images || []);
    const fileInputRef = useRef(null);
    const isMobile = useCheckMobile();

    const handleTitleChange = (event) => {
        event.stopPropagation()
        setTitle(event.target.value);
    };

    const handlePostContentChange = (event) => {
        event.stopPropagation()
        setPostContent(event.target.value);
    };

    const handleCreatePostClick = async () => {
            if (!title) {
                toast.error('Please enter a title!');
                return;
            }

            const base64Urls = [];
            const promises = [];

            // Read each selected file as a base64 URL
            for (const file of selectedFiles) {
                const promise = new Promise((resolve) => {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        base64Urls.push(reader.result);
                        resolve();
                    };

                    reader.readAsDataURL(file);
                });

                promises.push(promise);
            }

            // Wait for all file reading promises to resolve
            await Promise.all(promises);

            if (selectedFiles.length > 0) {

                handleCreatePost('LOST', title, postContent, null, null, base64Urls, null, null)
                    .then((resp) => {
                        if (resp.status === 200 || resp.status === 201) {
                            toast.success('Post created successfully!');
                            setPopupOpen(false);
                            reloadPosts();
                        } else {
                            toast.error(resp.data);
                        }
                    })
                    .catch((e) => {
                        toast.error(e);
                    });
            } else {
                toast.error('Please upload at least one image!')
            }
        }
    ;

    const handleUpdatePostClick = async () => {
        if (!title) {
            toast.error('Please enter a title!');
            return;
        }

        const base64Urls = [];
        const promises = [];

        // Read each selected file as a base64 URL
        for (const file of selectedFiles) {
            if (typeof file === 'string') {
                // If file is a base64 string, push it directly to the array
                base64Urls.push(file);
            } else if (file instanceof Blob || file instanceof File) {
                // If file is a Blob or File, read it as a data URL
                const promise = new Promise((resolve) => {
                    const reader = new FileReader();

                    reader.onloadend = () => {
                        base64Urls.push(reader.result);
                        resolve();
                    };

                    reader.readAsDataURL(file);
                });

                promises.push(promise);
            }
        }

        // Wait for all file reading promises to resolve
        await Promise.all(promises);

        if (selectedFiles.length === 0) {
            toast.error('Please upload at least one image!')
        } else {
            handleUpdatePost(post._id, null, title, postContent, base64Urls)
                .then((resp) => {
                    if (resp.status === 200) {
                        toast.success('Post updated successfully!');
                        setPopupOpen(false);
                        reloadPosts();
                    } else {
                        toast.error(resp.data);
                    }
                })
                .catch((e) => {
                    toast.error(e);
                });
        }
    }

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (event) => {
        event.stopPropagation()
        const files = event.target.files;
        const totalFiles = files.length + selectedFiles.length;

        if (totalFiles > 4) {
            toast.error('You can upload a maximum of 4 images.');
            return;
        }

        // Append new files to the existing selectedFiles array
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...Array.from(files)]);
    };
    const handleRemoveFile = (fileToRemove) => {
        const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div className={'content-container'}>
            <div className={'title-container'}>{isEditing ? 'Edit' : 'Create'} Found Post</div>
            <div className={'title-prompt'}>Title</div>
            <TextInput placeholder={'Enter Title'} onChange={handleTitleChange} style={{width: '95%'}}/>
            <div className={`create-forum-post-buttons-and-files-container ${isMobile ? 'mobile' : ''}`}>
                <div className={'create-forum-post-buttons sales'}>
                    <label htmlFor="file-upload" style={{cursor: 'pointer'}}>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            multiple
                            style={{display: 'none'}}
                            onChange={handleFileInputChange}
                            ref={fileInputRef}
                        />
                        <IconButton sx={{width: '40px', my: '5px'}} onClick={handleFileUpload}>
                            <FaRegFileImage style={{color: 'var(--logo-blue)'}}/>
                        </IconButton>
                    </label>
                </div>
                <div className={`create-forum-post-file-name-div sales ${isMobile ? 'mobile' : ''}`}>
                    {selectedFiles.map((file, index) => (
                        <ImageUploadTitleBox fileName={file.name ? file.name : `Image ${index + 1}`} removeFile={() => handleRemoveFile(file)}/>
                    ))}
                </div>
            </div>
            <div className={'description-prompt'}>Description</div>
            <TextArea
                placeholder={'Enter Description'}
                onChange={handlePostContentChange}
                value={postContent}
                style={{width: '95%'}}
            />
            <div className={'create-post-button-container'}>
                {isEditing ? <SimpleButton onClick={handleUpdatePostClick} label={'Update Post'} isRed/>
                    : <SimpleButton onClick={handleCreatePostClick} label={'Create Post'} isRed/>
                }
            </div>
        </div>
    )
        ;
};

export default CreateLostPostPopup;