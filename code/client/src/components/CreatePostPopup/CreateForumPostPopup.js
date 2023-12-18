/**
 * Creates a forum post popup component.
 * @param {Object} props - The component props.
 * @param {function} props.setPopupOpen - Function to set the popup open state.
 * @param {function} props.reloadPosts - Function to reload the forum posts.
 * @param {boolean} props.isEditing - Flag indicating if the post is being edited.
 * @param {Object} props.post - The post object being edited.
 * @returns {JSX.Element} The forum post popup component.
 * @remarks
 * This component is used to create or edit a forum post.
 * It allows the user to enter a title, description, and upload images.
 * The component provides options to toggle anonymity, add/remove images, and submit the post.
 * If the user is editing a post, the component pre-fills the input fields with the post data.
 */

import React, {useState, useRef, useEffect} from 'react';
import './styles.css';
import TextInput from '../TextInput';
import {IconButton} from '@mui/material';
import {BiMask, BiSolidMask} from 'react-icons/bi';
import toast from 'react-hot-toast';
import TextArea from '../TextArea';
import SimpleButton from '../SimpleButton';
import {handleCreatePost, handleUpdatePost} from '../../helpers/apiHelper';
import {FaRegFileImage} from 'react-icons/fa';
import ImageUploadTitleBox from "../ImageUploadTitleBox";
import useCheckMobile from "../../hooks/useCheckMobile";

const CreateForumPostPopup = ({setPopupOpen, reloadPosts, isEditing, post}) => {
    const [isAnon, setAnon] = useState(false);
    const [title, setTitle] = useState(post?.title);
    const [postContent, setPostContent] = useState(post?.description);
    const [selectedFiles, setSelectedFiles] = useState(post?.images || []);
    const fileInputRef = useRef(null);
    const isMobile = useCheckMobile();

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePostContentChange = (event) => {
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

        // Now you can use the base64Urls array in the API call
        handleCreatePost('FORUM', title, postContent, isAnon, null, base64Urls)
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
    };

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

        // Now you can use the base64Urls array in the API call
        handleUpdatePost(post._id, isAnon, title, postContent, base64Urls)
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
    };

    const toggleAnon = () => {
        setAnon(!isAnon);
        toast(`${isAnon ? 'Post is no longer anonymous!' : 'Post is now anonymous!'}`);
    };

    const handleFileUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (event) => {
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
            <div className={'title-container'}>{isEditing ? 'Edit' : 'Create'} Forum Post</div>
                <div className={'title-prompt'}>Title</div>
                <TextInput placeholder={'Enter Title'} onChange={handleTitleChange} value={title} style={{width: '95%'}}/>
                <div className={`create-forum-post-buttons-and-files-container ${isMobile ? 'mobile' : ''}`}>
                    <div className={'create-forum-post-buttons'}>
                        <IconButton sx={{width: '40px', my: '5px'}} onClick={toggleAnon}>
                            {isAnon ? <BiSolidMask style={{color: 'var(--logo-blue)'}}/> :
                                <BiMask style={{color: 'var(--logo-blue)'}}/>}
                        </IconButton>
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
                    <div className={`create-forum-post-file-name-div ${isMobile ? 'mobile' : ''}`}>
                        {selectedFiles.map((file, index) => (
                            <ImageUploadTitleBox fileName={file.name ? file.name : `Image ${index + 1}`} removeFile={() => handleRemoveFile(file)} />
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
    );
};

export default CreateForumPostPopup;
