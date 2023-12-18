

/**
 * Creates a sales post popup component.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.setPopupOpen - Function to set the popup open state.
 * @param {Function} props.reloadPosts - Function to reload posts.
 * @param {boolean} props.isEditing - Flag indicating if the post is being edited.
 * @param {Object} props.post - The post object.
 * @returns {JSX.Element} The sales post popup component.
 * 
 * @description
 * This component is responsible for rendering a popup for creating or editing a sales post.
 * It allows the user to enter a title, price, description, and upload images.
 * The component provides functionality to handle creating or updating the post.
 * It also includes validation and error handling for required fields and image uploads.
 */
import React, {useEffect, useRef, useState} from 'react';
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

const CreateSalePostPopup = ({setPopupOpen, reloadPosts, isEditing, post}) => {
    const [title, setTitle] = useState(post?.title);
    const [postContent, setPostContent] = useState(post?.description);
    const [selectedFiles, setSelectedFiles] = useState(post?.images || []);
    const [price, setPrice] = useState(post?.price)
    const [displayPrice, setDisplayPrice] = useState('0 TL');
    const fileInputRef = useRef(null);
    const isMobile = useCheckMobile();

    useEffect(() => {
        if (price) {
            setDisplayPrice(price + ' TL');
        } else {
            setDisplayPrice('0 TL');
        }
    }, [price])

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePriceChange = (event) => {
        let enteredValue = event.target.value.replace(/[^\d.-]/g, '').replace(/,/g, '')

        if (event.nativeEvent.inputType === 'deleteContentBackward') {
            enteredValue = enteredValue.slice(0, -1);
        } else if (event.nativeEvent.data === '.') {
            enteredValue = enteredValue + '.';
        }

        // Check if the remaining value is a valid number
        const numericValue = parseFloat(enteredValue)
        const isNumeric = !isNaN(numericValue) && isFinite(numericValue);

        if (isNumeric) {
            // Format the numeric value with commas and update the state, appending " TL"
            setPrice(numericValue);
        } else {
            setPrice(null)
        }
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
            if (selectedFiles.length > 0) {
                handleCreatePost('SALE', title, postContent, null, null, base64Urls, null, price)
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
            handleUpdatePost(post._id, null, title, postContent, base64Urls, null, price)
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
            <div className={'title-container'}>{isEditing ? 'Edit' : 'Create'} Sales Post</div>
            <div className={'title-price-prompt'}>
                <div style={{width: '75%', marginRight: '10px'}}>
                    <div className={'title-prompt'}>Title</div>
                    <TextInput placeholder={'Enter Title'} value={title} onChange={handleTitleChange} style={{width: '90%'}}/>
                </div>
                <div style={{width: '20%'}}>
                    <div className={'price-prompt'}>Price</div>
                    <TextInput placeholder={'Enter Price'} pattern={"\d+(\.\d{1,2})?"} onChange={handlePriceChange}
                               value={displayPrice}
                               style={{width: '90%'}}/>
                </div>
            </div>
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
                        <ImageUploadTitleBox fileName={file.name ? file.name : `Image ${index + 1}`}
                                             removeFile={() => handleRemoveFile(file)}/>
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

export default CreateSalePostPopup;