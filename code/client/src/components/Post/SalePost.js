


/**
 * Renders a sale post component.
 * 
 * @param {Object} post - The post object containing information about the sale post.
 * @param {boolean} isExpanded - Indicates whether the post is expanded or not.
 * @param {Function} reloadPosts - Function to reload the posts.
 * @param {Function} openEditMenu - Function to open the edit menu.
 * @returns {JSX.Element} - The rendered sale post component.
 * 
 * @remarks
 * This component is responsible for rendering a sale post. It displays the post title, options dropdown, images, price, availability, message seller button, user tag, post details, description, and post actions.
 * The component also handles various event handlers such as sharing the post, deleting the post, toggling the resolved status, editing the post, and starting a chat with the seller.
 * If the post is expanded, it renders the complete sale post with all the details. If the post is not expanded, it renders a compact version of the sale post.
 */
import "./styles.css"
import {getTimeSince} from "../../utils/getTimeSince";
import {Divider, IconButton} from "@mui/material";
import {AiOutlineShareAlt} from "react-icons/ai";
import useCheckMobile from "../../hooks/useCheckMobile";
import React, {Fragment, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import SimpleButton from "../SimpleButton";
import SalesImageCarousel from "../SalesImageCarousel";
import UserTag from "../UserTag";
import Base64Image from "../Base64Image";
import {AuthContext} from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import {handleDeletePost, handleUpdatePost} from "../../helpers/apiHelper";
import PostOptionsDropdown from "../PostOptionsDropdown";

const SalePost = ({post, isExpanded, reloadPosts, openEditMenu}) => {
    const isMobile = useCheckMobile();
    const navigate = useNavigate();
    const {email} = React.useContext(AuthContext);

    const handleSharePress = (event) => {
        event.stopPropagation(); // prevent event from bubbling up
        const shareData = {
            title: 'Check this post out!',
            text: post.title,
            url: `${process.env.REACT_APP_API_URL}/post/${post._id}`,
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        }
    };

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

    const handlePostPress = (event) => {
        event.stopPropagation()
        navigate(`/post/${post._id}`)
    }

    const handleToggleResolvedPress = (event) => {
        event.stopPropagation()

        let resolved = !post.isResolved

        handleUpdatePost(post._id, null, null, null, null, null, null, resolved)
            .then(resp => {
                if (resp.status === 200) {
                    toast.success('Post updated!')
                    reloadPosts();
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

    const handleStartChat = (email) => {
        console.log('email:', email);
        console.log('navigate:', navigate);
        navigate(`/chats/${email}`)
    }

    return isExpanded ? (
        <div
            className={`post-card ${isMobile ? "mobile" : ""}`}
            onClick={!isExpanded ? handlePostPress : null}
        >
            <div className={`post-header`}>
                <div className={"post-detail"}>
                    <div className={"post-title sales"}>{post.title}</div>
                    <PostOptionsDropdown
                        post={post}
                        handleSharePost={handleSharePress}
                        handleDeletePost={handleDeletePress}
                        handleToggleResolved={handleToggleResolvedPress}
                        handleEditPost={handleEditPress}
                    />
                </div>
            </div>
            <Divider/>
            <div className={"sales-content"}>
                <div className={`sales-middle-content ${isMobile ? "mobile" : ""} `}>
                    <div className={`post-images sales`}>
                        <SalesImageCarousel images={post?.images}/>
                    </div>
                    <div className={"post-price"}>
                        {post.price.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                        })}{" "}
                        TL
                        <br/>
                        <div style={{'marginTop': '3px'}}>{post.isResolved ? "Not available" : "Available"}</div>
                        <SimpleButton
                            label={"💬 Message Seller"}
                            onClick={() => {
                                handleStartChat(post.creatorEmail);
                            }}
                            isRed
                            style={{marginTop: "3px"}}
                        />
                        <UserTag
                            isAnonymous={post.isAnonymous}
                            creatorEmail={post.creatorEmail}
                            style={{marginBottom: 5}}
                        />
                        <div className={"post-detail"}>
                            {getTimeSince(post.dateCreated)}
                        </div>
                    </div>
                </div>
                <Divider/>
                <div className={"post-description sales"}>
                    {post.description != null
                        ? post.description.split("\n").map((line, index) => (
                            <Fragment key={index}>
                                {line}
                                {index !== post.description.split("\n").length - 1 && (
                                    <br/>
                                )}
                            </Fragment>
                        ))
                        : "No description provided."}
                </div>
            </div>

            <Divider/>

            <div className={"post-actions sales"}>
                <IconButton
                    className={"action-icon-button"}
                    onClick={handleSharePress}
                >
                    <AiOutlineShareAlt/>
                </IconButton>
            </div>
        </div>
    ) : (
        <div
            className={`post-card-sales ${isMobile ? "mobile" : ""}`}
            onClick={!isExpanded ? handlePostPress : null}
        >
            <Base64Image
                base64String={post?.images[0]}
                className={"sales-image-display"}
            />
            <Divider style={{marginBlock: "5px", width: "100%"}}/>
            <div className={"post-title small"}>{post.title}</div>
            <Divider style={{marginBottom: "5px", width: "100%"}}/>
            <div className={"post-price small"}>
                {post.price.toLocaleString(undefined, {maximumFractionDigits: 2})}{" "}
                TL
                <div className={"post-detail"}>
                    {getTimeSince(post.dateCreated)}
                </div>
            </div>
        </div>
    );
}

export default SalePost