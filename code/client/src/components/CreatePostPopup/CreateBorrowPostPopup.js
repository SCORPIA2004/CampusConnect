/**
 * Renders a popup component for creating or editing a borrow post.
 * @param {Object} props - The component props.
 * @param {Function} props.setPopupOpen - A function to set the popup open state.
 * @param {Function} props.reloadPosts - A function to reload the posts.
 * @param {boolean} props.isEditing - A flag indicating if the post is being edited.
 * @param {Object} props.post - The post object being edited.
 * @returns {JSX.Element} The JSX element representing the create or edit borrow post popup.
 */

import React, {useEffect, useRef, useState} from 'react';
import './styles.css';
import useCheckMobile from "../../hooks/useCheckMobile";
import toast from "react-hot-toast";
import {handleCreatePost, handleUpdatePost} from "../../helpers/apiHelper";
import TextInput from "../TextInput";
import 'dayjs/locale/en-gb';
import TextArea from "../TextArea";
import SimpleButton from "../SimpleButton";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker, LocalizationProvider, MobileDatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";

const CreateBorrowPostPopup = ({setPopupOpen, reloadPosts, isEditing, post}) => {
    const [title, setTitle] = useState(post?.title);
    const [postContent, setPostContent] = useState(post?.description);
    const [cleared, setCleared] = useState(false);
    const [date, setDate] = useState(post?.duration ? dayjs().add(post.duration, "day") : null);
    const isMobile = useCheckMobile();

    useEffect(() => {
        if (cleared) {
            const timeout = setTimeout(() => {
                setCleared(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
        return () => {
        };
    }, [cleared]);

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

        if (!date || dayjs(date).isBefore(dayjs().add(1, 'day'))) {
            toast.error('Please enter a valid date!');
            return;
        }

        const duration = dayjs(date).diff(dayjs(new Date()), 'day');

        // Now you can use the base64Urls array in the API call
        handleCreatePost('BORROW', title, postContent, null, null, null, duration, null)
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

        if (!date || dayjs(date).isBefore(dayjs().add(1, 'day'))) {
            toast.error('Please enter a valid date!');
            return;
        }

        const duration = dayjs(date).diff(dayjs(new Date()), 'day');

        handleUpdatePost(post._id, null, title, postContent, null, duration)
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

    const handleDateChange = (date) => {
        setDate(date);
    }

    return (
        <div className={'content-container borrow'}>
            <div className={'title-container'}>{isEditing ? 'Edit' : 'Create'} Borrow Post</div>
            <div className={'title-date-prompt'}>
                <div style={{width: '55%'}}>
                    <div className={'title-prompt'}>Title</div>
                    <TextInput placeholder={'Enter Title'} onChange={handleTitleChange} value={title}
                               style={{width: '90%', height: '19px'}}/>
                </div>
                <div style={{width: '40%'}}>
                    <div className={'date-prompt'}>Return Date</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
                        {isMobile ? <MobileDatePicker minDate={dayjs().add(1, 'day')}
                                                      onChange={handleDateChange}
                                                      defaultValue={date}
                                                      slotProps={{
                                                          field: {clearable: true, onClear: () => setCleared(true)},
                                                          textField: {size: 'small'},
                                                      }}
                        /> : <DesktopDatePicker minDate={dayjs().add(1, 'day')}
                                                onChange={handleDateChange}
                                                defaultValue={date}
                                                slotProps={{
                                                    field: {clearable: true, onClear: () => setCleared(true)},
                                                    textField: {size: 'small'},
                                                }}
                        />}
                    </LocalizationProvider>
                </div>
            </div>
            <div>
                <div className={'description-prompt'}>Description</div>
                <TextArea
                    placeholder={'Enter Description'}
                    onChange={handlePostContentChange}
                    value={postContent}
                    style={{width: '95%'}}
                />
            </div>
            <div className={'create-post-button-container'}>
                {isEditing ? <SimpleButton onClick={handleUpdatePostClick} label={'Update Post'} isRed/>
                    : <SimpleButton onClick={handleCreatePostClick} label={'Create Post'} isRed/>
                }
            </div>
        </div>
    );
};

export default CreateBorrowPostPopup;