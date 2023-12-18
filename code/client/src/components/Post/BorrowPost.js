/**
 * This file is a React component that represents a Borrow Post.
 * It is responsible for rendering the UI of a Borrow Post, handling user interactions, and making API calls.
 * The component displays information such as the post's title, description, creator, and creation date.
 * It also provides options for sharing, editing, and deleting the post.
 * The BorrowPost component is used in the application's PostList and PostDetail components.
 * It utilizes various helper functions and components from the application's codebase.
 * The component supports responsive design for mobile devices.
 * It also handles navigation to chat pages and other post-related actions.
 * The component uses the react-icons library for displaying icons.
 * The dayjs library is used for formatting and displaying dates.
 * The component makes API calls to handle post deletion, liking, and updating.
 * It utilizes the react-hot-toast library for displaying toast notifications.
 * The getTimeSince function from the utils/getTimeSince module is used to calculate the time elapsed since the post's creation.
 * The useCheckMobile hook from the hooks/useCheckMobile module is used to determine if the device is a mobile device.
 * The useNavigate hook from the react-router-dom library is used for programmatic navigation.
 * The SimpleButton and UserTag components are custom components used for rendering buttons and user tags.
 * The PostOptionsDropdown component is a custom dropdown menu component for post options.
 * The component uses the Divider component from the @mui/material library for visual separation.
 * The BorrowPost component receives props such as the post data, expanded state, and various event handlers.
 * It renders different UI elements based on the expanded state and post data.
 * The component provides functionality for deleting, editing, and messaging the post creator.
 * It also displays the requested duration and return date of the borrow post.
 */


import "./styles.css";
import {getTimeSince} from "../../utils/getTimeSince";
import {Divider, IconButton} from "@mui/material";
import {AiFillHeart, AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt} from "react-icons/ai";
import useCheckMobile from "../../hooks/useCheckMobile";
import React, {Fragment, useState} from "react";
import {useNavigate} from "react-router-dom";
import SimpleButton from "../SimpleButton";
import UserTag from "../UserTag";
import toast from "react-hot-toast";
import {handleDeletePost, handleLikePost, handleUpdatePost} from "../../helpers/apiHelper";
import PostOptionsDropdown from "../PostOptionsDropdown";
import dayjs from "dayjs";

const BorrowPost = ({post, isExpanded, handleSharePress, handlePostPress, reloadPosts, openEditMenu}) => {
    const isMobile = useCheckMobile();
    const navigate = useNavigate();

    const handleDeletePress = (event) => {
        event.stopPropagation()
        handleDeletePost(post._id)
            .then(resp => {
                if (resp.status === 200) {
                    toast.success('Post deleted!')
                    if (isExpanded) {
                        navigate(`/home/${post.type}`)
                    } else {
                        reloadPosts()
                    }
                } else {
                    toast.error(resp.data)
                }
            }).catch(e => {
            toast.error(e)
        })
    }

    const handleEditPress = (event) => {
        event.stopPropagation()
        openEditMenu(true)
    }

    const handleMessage = (event) => {
        navigate(`/chats/${post.creatorEmail}`)
    }


    return <div className={`post-card ${isMobile ? 'mobile' : ''}`} onClick={!isExpanded ? handlePostPress : null}>
        <div className={`post-header`}>
            <div className={"post-detail"} onClick={(e) => e.stopPropagation()}>
                <div>
                    {getTimeSince(post.dateCreated)}
                </div>
                <PostOptionsDropdown post={post} handleSharePost={handleSharePress} handleDeletePost={handleDeletePress}
                                     handleEditPost={handleEditPress}
                />
            </div>
            <Divider/>

            <div className={"post-title"}>
                <div className={"post-title-text"}>
                    <UserTag creatorEmail={post.creatorEmail} style={{marginBottom: 5}}/>
                    {post.title}
                </div>
            </div>
        </div>
        {isExpanded && post?.description?.length > 0 &&
            <>
                <Divider/>
                <div className={"post-description"}>
                    {post.description}
                </div>
            </>}
        <Divider/>

        {isExpanded && <>
            <div className={'borrow-button-div'}>
              <SimpleButton
                  label={"💬 Message Borrower"}
                  isRed
                  onClick={handleMessage}
                  style={{marginTop: "3px"}}
              />
              Will Return On: {dayjs(post.dateCreated).add(post.duration, 'day').format("DD/MM/YY")}
            </div>

          <Divider/>
        </>}

        <div className="post-actions borrow">
            <div>
                <IconButton className="action-icon-button" onClick={handleSharePress}>
                    <AiOutlineShareAlt/>
                </IconButton>
            </div>
            <div className={'borrow-return-date'}>
                Requested Duration: {post.duration} days
            </div>
        </div>
    </div>
}

export default BorrowPost;
