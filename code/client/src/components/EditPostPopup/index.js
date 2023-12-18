/**
 * Renders an EditPostPopup component.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.page - The current page.
 * @param {boolean} props.isPopupOpen - Flag indicating if the popup is open.
 * @param {function} props.setPopupOpen - Function to set the popup open state.
 * @param {Object} props.post - The post to be edited.
 * @param {function} props.reloadPosts - Function to reload posts.
 * @returns {JSX.Element} The rendered EditPostPopup component.
 */
import React from 'react';
import CreatePostPopup from "../CreatePostPopup";

const EditPostPopup = ({page, isPopupOpen, setPopupOpen, post, reloadPosts}) => {
    return (
        <CreatePostPopup page={page} isPopupOpen={isPopupOpen} setPopupOpen={setPopupOpen}
                         isEditing post={post} reloadPosts={reloadPosts}/>
    );
};

export default EditPostPopup;