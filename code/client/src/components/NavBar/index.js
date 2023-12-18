/**
 * Renders the navigation bar component.
 * 
 * The navigation bar component displays the logo of Campus Connect and provides navigation options.
 * It also includes a chat button and a profile dropdown for logged-in users.
 * 
 * @returns {JSX.Element} The rendered navigation bar component.
 */
import "./styles.css"
import CampusConnectLogo from "../../assets/main-logo.svg"
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {AuthContext} from "../../providers/AuthProvider";
import ProfileDropdown from "./ProfileDropdown";
import IconTextButton from "../../components/IconTextButton";
import { RiWechatLine } from "react-icons/ri";
import { IconButton } from "@mui/material";

const NavBar = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout} = React.useContext(AuthContext);

    const goHome = () => {
      navigate("/");
    };

    const gotoChat = () => {
      navigate("/chats");
    };


    return (
      <div className="nav-bar">
        <img
          src={CampusConnectLogo}
          alt={"Campus Connect"}
          className="campus-connect-logo"
          onClick={goHome}
        />
        {isLoggedIn && (
          <div className="nav-bar-right">
            <IconButton
              variant="plain"
              onClick={() => {
                gotoChat();
              }}
            >
              {<RiWechatLine color={"black"} opacity={0.75} />}
            </IconButton>

            <ProfileDropdown />
          </div>
        )}
      </div>
    );
}

export default NavBar