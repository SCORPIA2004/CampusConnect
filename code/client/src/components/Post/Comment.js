


/**
 * Renders a comment component for a post.
 * @param {Object} comment - The comment object.
 * @param {Function} handlePostPress - The function to handle post press.
 * @param {Function} reloadPosts - The function to reload posts.
 * @param {Function} openEditMenu - The function to open the edit menu.
 * @returns {JSX.Element} The comment component.
 */
import useCheckMobile from "../../hooks/useCheckMobile";
import React, {useState} from "react";
import {handleLikePost} from "../../helpers/apiHelper";
import toast from "react-hot-toast";
import {getTimeSince} from "../../utils/getTimeSince";
import {IconButton} from "@mui/material";
import UserTag from "../UserTag";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

const Comment = ({comment, handlePostPress, reloadPosts, openEditMenu}) => {
    const isMobile = useCheckMobile();
    const [isPostLiked, setPostLiked] = useState(comment.isLiked);
    const [postsLikes, setPostLikes] = useState(comment.likes?.length);

    const handleLikePress = (event) => {
        event.stopPropagation();
        handleLikePost(comment._id).then((res) => {
            comment.isLiked = res.data;
            toast(res.data ? '👍 Post liked' : '👎 Post unliked')
            setPostLiked(res.data);
            res.data ? setPostLikes(postsLikes + 1) : setPostLikes(postsLikes - 1);
        }).catch((e) => toast.error(e))
    }

    return (
        <div className={`post-card ${isMobile ? 'mobile' : ''}`} onClick={handlePostPress}>
            <div className={"post-description"}>
                <div className={"post-title-text"}>
                    <div style={{display: "flex"}}>
                        <UserTag isAnonymous={comment.isAnonymous} creatorEmail={comment.creatorEmail}/>
                        <div style={{opacity: 0.8, fontSize: 8, marginLeft: 10, display: "flex", placeItems: "center"}}>
                            {getTimeSince(comment.dateCreated)}
                        </div>
                    </div>
                    {comment.title}
                </div>
                <div>
                    <IconButton className="action-icon-button" onClick={handleLikePress}>
                        {isPostLiked ? <AiFillHeart color="red"/> : <AiOutlineHeart/>}
                    </IconButton>
                    <div className="post-detail center" style={{marginTop: -7}}>
                        {postsLikes}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Comment