



/**
 * Renders a sidebar component for a web application.
 * The sidebar displays various icons and options based on the user's authentication status and device type.
 * The component includes functionality for handling user interactions such as logout, navigation, and post type selection.
 * @returns {JSX.Element} The rendered sidebar component.
 */
import React, { useState } from 'react';
import './styles.css';
import Drawer from '@mui/joy/Drawer';
import { BiHome } from "react-icons/bi";
import { AiOutlineMenu, AiOutlineShopping } from "react-icons/ai";
import { LuPackageSearch } from "react-icons/lu";
import useGetClientsEmail from "../../hooks/useGetClientsEmail";
import useCheckMobile from "../../hooks/useCheckMobile";
import { ModalClose } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { TbClockHeart } from "react-icons/tb";
import {IoChatbubblesOutline, IoExitOutline} from "react-icons/io5";
import toast from "react-hot-toast";
import {AuthContext} from "../../providers/AuthProvider";
import {PiHandHeartBold} from "react-icons/pi";
import {RiWechatLine} from "react-icons/ri";

const SideBar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useCheckMobile();
    const navigate = useNavigate();
    const { isLoggedIn, logout} = React.useContext(AuthContext);
    const userEmail = useGetClientsEmail();

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
        toast.success('Logged out successfully!');
    };

    const handlePostTypeChange = (postType) => {
        navigate(`/home/${postType}`)
        setIsDrawerOpen(false);
    };

    const handleDonationPress = () => {
        handlePostTypeChange('DONATE');
    };

    const handleSalePress = () => {
        handlePostTypeChange('SALE');
    };

    const handleLostPress = () => {
        handlePostTypeChange('LOST');
    };

    const handleBorrowPress = () => {
        handlePostTypeChange('BORROW');
    };

    const handleChatsPress = () => {
        navigate('/chats')
    }

    const handleForumPress = () => {
        handlePostTypeChange('FORUM');
    };

    if (isLoggedIn) return (
        <div>
            {isMobile ? (
                <AiOutlineMenu size={15} className={'menu-button'} onClick={() => setIsDrawerOpen(true)} />
            ) : (
                <div className={'drawer-closed'} onMouseEnter={() => setIsDrawerOpen(true)}>
                    <div className={'drawer-closed-top-icons'}>
                        <div className={'drawer-content'}>
                            <BiHome size={20} />
                        </div>
                        <div className={'drawer-content'}>
                            <AiOutlineShopping size={20} />
                        </div>
                        <div className={'drawer-content'}>
                            <PiHandHeartBold  size={20} />
                        </div>
                        <div className={'drawer-content'}>
                            <LuPackageSearch size={20} />
                        </div>
                        <div className={'drawer-content'}>
                            <TbClockHeart size={20} />
                        </div>

                    </div>
                    <div className={'drawer-closed-bottom-icons'}>
                        <div className={'drawer-content logout'}>
                            <IoExitOutline size={20} />
                        </div>
                    </div>
                </div>
            )}
            <Drawer open={isDrawerOpen}>
                <div onMouseLeave={() => { setIsDrawerOpen(false) }} className={'drawer-unblurred-area'}>
                    {isMobile && <ModalClose onClick={() => setIsDrawerOpen(false)} />}
                    <div className={'top-content'}>
                        <div className={`drawer-open-content email ${isMobile ? 'mobile' : ''}`} onClick={() => navigate(`/profile/${userEmail}`)} >
                            👤 {userEmail}
                        </div>
                        <div className={'drawer-open-content text'} onClick={handleForumPress} >
                            <BiHome size={23} className={'drawer-icon'}/> <div>Home</div>
                        </div>
                        <div className={'drawer-open-content text'} onClick={handleSalePress}>
                            <AiOutlineShopping size={23} className={'drawer-icon'} /> <div>Second Hand Sales</div>
                        </div>
                        <div className={'drawer-open-content text'} onClick={handleDonationPress}>
                            <PiHandHeartBold  size={23} className={'drawer-icon'} /> <div>Donation</div>
                        </div>
                        <div className={'drawer-open-content text'} onClick={handleLostPress}>
                            <LuPackageSearch size={23} className={'drawer-icon'} /> <div>Lost and Found</div>
                        </div>
                        <div className={'drawer-open-content text'} onClick={handleBorrowPress}>
                            <TbClockHeart size={23} className={'drawer-icon'} /> <div>Borrow</div>
                        </div>

                    </div>
                    <div className={'bottom-content'}>
                        <div className={'drawer-open-content text logout'} onClick={handleLogoutClick}>
                            <IoExitOutline size={23} className={'drawer-icon'} /> <div>Logout</div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default SideBar;
