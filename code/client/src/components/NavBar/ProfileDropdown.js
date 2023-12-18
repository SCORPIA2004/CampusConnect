


/**
 * Renders a profile dropdown menu for the navigation bar.
 * @returns {JSX.Element} The profile dropdown menu component.
 * @remarks
 * This component displays a dropdown menu in the navigation bar for the user's profile options.
 * It includes options for viewing the user's profile, accessing settings, getting help, and logging out.
 * The component uses Material-UI components and custom hooks for authentication and navigation.
 */
import {Dropdown, ListDivider, ListItemDecorator, Menu, MenuButton, MenuItem} from "@mui/joy";
import {IconButton} from "@mui/material";
import {FaUserCircle} from "react-icons/fa";
import {IoExitOutline} from "react-icons/io5";
import {IoMdSettings} from "react-icons/io";
import {MdOutlineHelp} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import useGetClientsEmail from "../../hooks/useGetClientsEmail";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ProfileDropdown = () => {
    const navigate = useNavigate();
    const {email, logout} = useAuth()
    const userEmail = useGetClientsEmail();
    

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
        toast.success('Logged out successfully!');
    };

    return (
        <Dropdown>
            <MenuButton
                slots={{root: IconButton}}
                size="sm"
            >
                <FaUserCircle color={"black"} opacity={0.75}/>
            </MenuButton>
            <Menu placement="bottom-end" size="sm">
                <MenuItem onClick={() => navigate(`/profile/${userEmail}`)}>
                    <ListItemDecorator>
                        <FaUserCircle size={20} opacity={0.9}/>
                    </ListItemDecorator>{' '}
                    Profile
                </MenuItem>
                <MenuItem onClick={() => navigate('/settings')}>
                    <ListItemDecorator>
                        <IoMdSettings size={20} opacity={0.9}/>
                    </ListItemDecorator>{' '}
                    Settings
                </MenuItem>
                <MenuItem onClick={() => navigate('/help')}>
                    <ListItemDecorator>
                        <MdOutlineHelp size={20} opacity={0.9}/>
                    </ListItemDecorator>{' '}
                    Help
                </MenuItem>
                <ListDivider/>
                <MenuItem onClick={handleLogoutClick} color="danger">
                    <ListItemDecorator sx={{color: 'inherit'}}>
                        <IoExitOutline size={20} opacity={0.9}/>
                    </ListItemDecorator>
                    Logout
                </MenuItem>
            </Menu>
        </Dropdown>
    )
}

export default ProfileDropdown