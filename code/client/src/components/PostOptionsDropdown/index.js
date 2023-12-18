


/**
 * Renders a dropdown menu with various options for a post.
 * @param {Object} post - The post object.
 * @param {Function} handleLikeToggle - The function to handle like/unlike action.
 * @param {Function} handleSharePost - The function to handle post sharing.
 * @param {Function} handleEditPost - The function to handle post editing.
 * @param {Function} handleToggleResolved - The function to handle marking/unmarking post as resolved.
 * @param {Function} handleDeletePost - The function to handle post deletion.
 * @returns {JSX.Element} - The rendered dropdown menu component.
 * @remarks
 * This component renders a dropdown menu with various options for a post.
 * The options include actions like liking/unliking a post, copying the post link, sharing the post,
 * editing the post, marking/unmarking the post as resolved, reporting the post, and deleting the post.
 * The visibility of certain options is conditional based on the post type and the user's role.
 */
import {Dropdown, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem} from "@mui/joy";
import {IconButton} from "@mui/material";
import {FaBars, FaLink, FaShare, FaUserCircle} from "react-icons/fa";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {CgSearchFound, CgSearchLoading} from "react-icons/cg";
import {MdDelete, MdReportProblem} from "react-icons/md";
import {GrEdit} from "react-icons/gr";
import {AuthContext} from "../../providers/AuthProvider";
import {useNavigate} from "react-router-dom";
import React from "react";
import toast from "react-hot-toast";

const PostOptionsDropdown = ({
                                 post,
                                 handleLikeToggle,
                                 handleSharePost,
                                 handleEditPost,
                                 handleToggleResolved,
                                 handleDeletePost,
                             }) => {

    const {email} = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoToCreator = () => {
        navigate(`/profile/${post.creatorEmail}`)
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`)
    }
    const menuItems = [
        {icon: FaUserCircle, text: 'Go to Creator', onClick: handleGoToCreator},
        {
            icon: post.isLiked ? AiOutlineHeart : AiFillHeart,
            text: post.isLiked ? 'Unlike' : 'Like',
            onClick: handleLikeToggle,
            condition: post.type === "FORUM"
        },
        {icon: FaLink, text: 'Copy Link', onClick: handleCopyLink},
        {icon: FaShare, text: 'Share Post', onClick: handleSharePost},
        {
            icon: GrEdit,
            text: 'Edit Post',
            onClick: handleEditPost,
            condition: post.creatorEmail === email,
        },
        {
            icon: post.isResolved ? CgSearchLoading : CgSearchFound,
            text: post.isResolved ? 'Unmark as Sold' : 'Mark as Sold',
            onClick: handleToggleResolved,
            condition: post.type === "SALE" && post.creatorEmail === email,
        },
        {
            icon: post.isResolved ? CgSearchLoading : CgSearchFound,
            text: post.isResolved ? 'Unmark as Borrowed' : 'Mark as Borrowed',
            onClick: handleToggleResolved,
            condition: post.type === "BORROW" && post.creatorEmail === email,
        },
        {
            icon: post.isResolved ? CgSearchLoading : CgSearchFound,
            text: post.isResolved ? 'Unmark as Found' : 'Mark as Found',
            onClick: handleToggleResolved,
            condition: post.type === "LOST" && post.creatorEmail === email,
        },
        {
            icon: post.isResolved ? CgSearchLoading : CgSearchFound,
            text: post.isResolved ? 'Unmark as Donated' : 'Mark as Donated',
            onClick: handleToggleResolved,
            condition: post.type === "DONATE" && post.creatorEmail === email,
        },
        {icon: MdReportProblem, text: 'Report Post', color: 'danger', onClick: () => toast('⚠️ Post reported!')},
        {
            icon: MdDelete,
            text: 'Delete Post',
            color: 'danger',
            onClick: handleDeletePost,
            condition: post.creatorEmail === email
        }
    ];

    return (
        <Dropdown>
            <MenuButton
                slots={{root: IconButton}}
                size="sm"
                style={{padding: 1}}
            >
                <FaBars size={12}/>
            </MenuButton>
            <Menu placement="bottom-end" size="sm">
                {menuItems.map(({icon: Icon, text, color, onClick, condition}, index) => (
                    condition === undefined || condition ? (
                        <>
                            {index === 8 && <ListDivider/>}
                            <MenuItem color={color} onClick={onClick}>
                                <ListItemDecorator sx={{color: 'inherit'}}>
                                    <Icon size={16} opacity={0.9}/>
                                </ListItemDecorator>
                                {text}
                            </MenuItem>
                        </>
                    ) : null
                ))}
            </Menu>
        </Dropdown>
    )
}

export default PostOptionsDropdown