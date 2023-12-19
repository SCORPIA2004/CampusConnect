

/**
 * Renders a post component based on its type.
 * @param {Object} post - The post object.
 * @param {boolean} isExpanded - Indicates if the post is expanded.
 * @param {Function} reloadPosts - Function to reload posts.
 * @returns {JSX.Element} - The rendered post component.
 */
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import SalePost from "./SalePost";
import ForumPost from "./ForumPost";
import DonatePost from "./DonatePost";
import BorrowPost from "./BorrowPost";
import LostPost from "./LostPost";
import {useState} from "react";
import EditPostPopup from "../EditPostPopup";

const Post = ({post, isExpanded, reloadPosts, }) => {
    const navigate = useNavigate();
    const [isPostBeingEdited, setIsPostBeingEdited] = useState(false);

    const handleSharePress = (event) => {
        event.stopPropagation();
        const {title, _id} = post;
        const url = `${process.env.REACT_APP_URL}/post/${_id}`;

        navigator.share?.({title: 'Check this post out!', text: title, url})
            .then(() => toast.success('Post shared successfully'))
            .catch((error) => toast.error(error));
    };

    const handlePostPress = () => navigate(`/post/${post._id}`);

    const PostType = {
        SALE: SalePost,
        FORUM: ForumPost,
        DONATE: DonatePost,
        BORROW: BorrowPost,
        LOST: LostPost,
    }[post.type];

    return (
        <>
            <EditPostPopup page={post.type} isPopupOpen={isPostBeingEdited} setPopupOpen={setIsPostBeingEdited}
                             post={post} reloadPosts={reloadPosts}/>
            <PostType post={post} isExpanded={isExpanded} handleSharePress={handleSharePress}
                      handlePostPress={handlePostPress} reloadPosts={reloadPosts} openEditMenu={setIsPostBeingEdited}
            />
        </>
    )
};

export default Post;