/**
 * Renders the PostPage component which displays a post and allows users to comment on it.
 * @component
 * @returns {JSX.Element} The PostPage component
 * @throws {Error} If an error occurs while fetching the post or making a comment
 */
import React, {useEffect, useState} from "react";
import PostSkeleton from "../../components/Post/PostSkeleton";
import {handleGetPosts, handleMakeComment} from "../../helpers/apiHelper";
import toast from "react-hot-toast";
import Post from "../../components/Post";
import './styles.css'
import {useNavigate} from "react-router-dom";
import Comment from "../../components/Post/Comment";
import {IconButton} from "@mui/material";
import {BiMask, BiSolidMask} from "react-icons/bi";
import useCheckMobile from "../../hooks/useCheckMobile";

const CreateCommentComponent = ({handlePostComment, commentText, setCommentText, isAnonymous, setIsAnonymous}) => {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handlePostComment();
        }
    }
    const isMobile = useCheckMobile();

    const toggleAnon = () => {
        setIsAnonymous(!isAnonymous);
        toast(`${isAnonymous ? 'Comment is no longer anonymous!' : 'Comment is now anonymous!'}`);
    };

    return (<>
        <div className={`comment-input-container ${isMobile ? 'mobile' : ''}`} style={{marginTop: -10}}>
            <input
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleKeyPress}
                value={commentText}
                className={`comment-input ${isMobile ? 'mobile' : ''}`}
                placeholder="🤔✍️ Share your opinions..."
            />
            <IconButton sx={{width: '40px', my: '5px'}} onClick={toggleAnon} style={{position: "absolute", top: 22, right: 5}}>
                {isAnonymous ? <BiSolidMask style={{color: 'var(--logo-blue)'}}/> :
                    <BiMask style={{color: 'var(--logo-blue)'}}/>}
            </IconButton>
        </div>

    </>)
}

const PostPage = () => {
    const [isPostLoading, setIsPostLoading] = useState(true);
    const [post, setPost] = useState();
    const navigate = useNavigate();
    const [commentText, setCommentText] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);



    const loadPost = async () => {
        let postID = window.location.href.split('/')[4];

        try {
            const resp = await handleGetPosts({postID});
            if (!resp.data[0]) navigate('/');
            setPost(resp.data[0]);
        } catch (err) {
            toast.error(err);
        } finally {
            setIsPostLoading(false);
        }
    }

    useEffect(() => {
        loadPost()
    }, []);

    const handlePostComment = async () => {
        try {
            await handleMakeComment(post._id, commentText, isAnonymous);
            toast.success("Comment posted!");
            loadPost();
        } catch (err) {
            toast.error(err);
        } finally {
            setCommentText("");
        }
    }

    return (<div className={'main-container'}>
        {isPostLoading ? (<PostSkeleton height={70}/>) : (<>
                <Post post={post} isExpanded reloadPosts={loadPost}/>
                {post.type === "FORUM" && (<>
                    <CreateCommentComponent
                        handlePostComment={handlePostComment}
                        commentText={commentText}
                        setCommentText={setCommentText}
                        isAnonymous={isAnonymous}
                        setIsAnonymous={setIsAnonymous}
                    />
                    {post.comments.map((comment) => (<Comment key={comment._id} comment={comment}/>))}
                </>)}
            </>

        )}
    </div>)
}

export default PostPage