


/**
 * Renders a forum post component.
 * @param {Object} post - The post object containing post details.
 * @param {boolean} isExpanded - Flag indicating if the post is expanded.
 * @param {Function} handleSharePress - Function to handle share button press.
 * @param {Function} handlePostPress - Function to handle post press.
 * @param {Function} reloadPosts - Function to reload posts.
 * @param {Function} openEditMenu - Function to open edit menu.
 * @returns {JSX.Element} The rendered forum post component.
 */
import './styles.css';
import React, {useEffect, useState} from "react";
import useCheckMobile from "../../hooks/useCheckMobile";
import {Divider, IconButton} from "@mui/material";
import {getTimeSince} from "../../utils/getTimeSince";
import {AiFillHeart, AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import Base64Image from "../Base64Image";
import ImagesCarousel from "../ImagesCarousel";
import UserTag from "../UserTag";
import PostOptionsDropdown from "../PostOptionsDropdown";
import {handleDeletePost, handleLikePost} from "../../helpers/apiHelper";
import toast from "react-hot-toast";

const ForumPost = ({post, isExpanded, handleSharePress, handlePostPress, reloadPosts, openEditMenu}) => {
    const isMobile = useCheckMobile();
    const navigate = useNavigate();
    const [isPostLiked, setPostLiked] = useState(post.isLiked);
    const [postsLikes, setPostLikes] = useState(post.likes?.length);
    const [postsComments, setPostComments] = useState(post.comments?.length);

    const handleLikePress = (event) => {
        event.stopPropagation();
        handleLikePost(post._id).then((res) => {
            post.isLiked = res.data;
            toast(res.data ? '👍 Post liked' : '👎 Post unliked')
            setPostLiked(res.data);
            res.data ? setPostLikes(postsLikes + 1) : setPostLikes(postsLikes - 1);
        }).catch((e) => toast.error(e))
    }



    const handleCommentPress = (event) => {
        event.stopPropagation();
        handlePostPress().then(() => {
            setPostComments(postsComments + 1);
        });
    }

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


    return <div className={`post-card ${isMobile ? 'mobile' : ''}`} onClick={!isExpanded ? handlePostPress : null}>
        <div className={`post-header`}>
            <div className={"post-detail"} onClick={(e) => e.stopPropagation()}>
                <div>
                    {getTimeSince(post.dateCreated)}
                </div>
                <PostOptionsDropdown post={post} handleSharePost={handleSharePress} handleDeletePost={handleDeletePress}
                                     handleLikeToggle={handleLikePress} handleEditPost={handleEditPress}
                />
            </div>
            <Divider/>

            <div className={"post-title"}>
                <div className={"post-title-text"}>
                    <UserTag isAnonymous={post.isAnonymous} creatorEmail={post.creatorEmail} style={{marginBottom: 5}}/>
                    {post.title}
                </div>
                {post?.images?.length > 0 && !isExpanded &&
                    <Base64Image base64String={post?.images[0]} className={"image-display"}/>}
            </div>
        </div>
        {isExpanded && post?.description?.length >0 &&
            <>
                <Divider/>
                <div className={"post-description"}>
                    {post.description}
                </div>
            </>}

        {isExpanded && post?.images?.length > 0 && <div className={"post-images"}>
            <ImagesCarousel images={post?.images}/>
        </div>}
        <Divider/>

        <div className="post-actions">
            <div>
                <IconButton className="action-icon-button" onClick={handleLikePress}>
                    {isPostLiked ? <AiFillHeart color="red"/> : <AiOutlineHeart/>}
                </IconButton>
                <IconButton className="action-icon-button" onClick={handleCommentPress}>
                    <AiOutlineComment/>
                </IconButton>
                <IconButton className="action-icon-button" onClick={handleSharePress}>
                    <AiOutlineShareAlt/>
                </IconButton>
            </div>
            <div className="post-detail center">
                <div style={{marginRight: '5px'}}>{postsLikes} Likes</div>
                {postsComments} Comments
            </div>
        </div>
    </div>
}

export default ForumPost