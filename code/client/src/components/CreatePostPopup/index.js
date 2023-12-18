/**
 * Renders a popup for creating different types of posts.
 * @param {Object} props - The component props.
 * @param {string} props.page - The type of post to create (SALE, FORUM, DONATE, BORROW, LOST).
 * @param {boolean} props.isPopupOpen - Indicates whether the popup is open or not.
 * @param {function} props.setPopupOpen - Callback function to set the popup open state.
 * @param {function} props.reloadPosts - Callback function to reload the posts.
 * @param {boolean} [props.isEditing=false] - Indicates whether the post is being edited or not.
 * @param {Object} [props.post=undefined] - The post object being edited.
 * @returns {JSX.Element} - The rendered CreatePostPopup component.
 */

import Popup from "../Popup";
import CreateSalePostPopup from "./CreateSalePostPopup";
import CreateDonatePostPopup from "./CreateDonatePostPopup";
import CreateBorrowPostPopup from "./CreateBorrowPostPopup";
import CreateLostPostPopup from "./CreateLostPostPopup";
import CreateForumPostPopup from "./CreateForumPostPopup";

const CreatePostPopup = ({ page, isPopupOpen, setPopupOpen, reloadPosts, isEditing = false, post = undefined }) => {

    const ComponentType = {
        SALE: CreateSalePostPopup,
        FORUM: CreateForumPostPopup,
        DONATE: CreateDonatePostPopup,
        BORROW: CreateBorrowPostPopup,
        LOST: CreateLostPostPopup,
    }[page];

    return (
        <Popup isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen}>
            <ComponentType setPopupOpen={setPopupOpen} reloadPosts={reloadPosts} isEditing={isEditing} post={post}/>
        </Popup>
    );
};

export default CreatePostPopup;
