/**
 * Renders the profile page for a user.
 * 
 * This component displays the profile information of a user, including their name, email, and profile picture.
 * It also allows the user to perform actions such as sharing their profile, sending a message, and reporting the user.
 * The component fetches the user's posts based on the selected post type (forum, sale, donation, borrow, lost) and displays them in a feed.
 * The posts can be filtered by post type using the buttons provided.
 * The component also handles loading states and error handling during data fetching.
 * 
 * @returns {JSX.Element} The rendered profile page.
 */

import React, {useEffect, useState, useMemo} from "react";
import "./styles.css";
import {FaShare} from "react-icons/fa";
import {MdReport, MdReportProblem} from "react-icons/md";
import {FaMessage} from "react-icons/fa6";
import {handleGetPosts, handleGetUser, handleGetUserByEmail} from "../../helpers/apiHelper";
import {useNavigate} from "react-router-dom";
import Post from "../../components/Post";
import toast from "react-hot-toast";
import LoadingPosts from "../../components/Loading Posts";
import {AiOutlineShopping} from "react-icons/ai";
import {LuPackageSearch} from "react-icons/lu";
import {TbClockHeart} from "react-icons/tb";
import {PiHandHeartBold} from "react-icons/pi";
import {FaUsers} from "react-icons/fa6";
import {Button, ButtonGroup} from "@mui/joy";
import ProfileBadge from "../../components/ProfileBadge";
import useCheckMobile from "../../hooks/useCheckMobile";
import {RiWechatLine} from "react-icons/ri";
import UserTag from "../../components/UserTag";


const ProfilePage = () => {

    const [user, setUser] = useState()
    const isMobile = useCheckMobile()
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [arePostsLoading, setPostsLoading] = useState(true);
    const [postType, setPostType] = useState("FORUM");

    const loadPosts = async () => {
        if (!user) return;
        const params = {
            type: postType, sortByNewest: true, isComment: false, creatorEmail: user.email,
        };
        setPostsLoading(true)

        handleGetPosts(params).then((resp) => {
            setPosts(resp.data);
        }).catch((e) => {
            toast.error(e);
        }).finally(() => setPostsLoading(false))
    };

    const loadUser = async () => {
        let userEmail = window.location.href.split('/')[4];
        handleGetUserByEmail(userEmail).then((resp) => {
            setUser(resp.data);
            loadPosts()
        }).catch((e) => {
            toast.error(e);
        })
    }


    useEffect(() => {
        loadUser();
    }, []);

    useEffect(() => {
        if (user) loadPosts();
    }, [postType, user])

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!")
    }

    const handleReport = () => {
        toast.success("Reported!")
    }

    const handleMessage = () => {
        navigate(`/chats/${user.email}`)
    }


    if (user) return (<div className={`profilePage ${isMobile ? "mobile" : ""}`}>
        <div className="profileHeader">
            <ProfileBadge firstName={user.firstName} lastName={user.lastName} email={user.email}
                          isActive={user.isActive} size={'lg'}/>
            <h1 className="profileName">{user.firstName} {user.lastName}</h1>
            <UserTag creatorEmail={user.email}/>
            <div className="profileEmail">{user.email}</div>
            <div className="profileActions">
                <div className="iconButtonsContainer">
                    <ButtonGroup aria-label="outlined primary button group">
                        <Button onClick={handleShare}><FaShare style={{marginRight: 5}} size={20}/> </Button>
                        <Button onClick={handleMessage}><RiWechatLine style={{marginRight: 5}} size={20}/></Button>
                        <Button onClick={handleReport}><MdReportProblem style={{marginRight: 5}} color={"red"} size={20}/></Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
        {<div className={"main-containers"}>
            <div className={`feed-container ${postType}`}>
                <div className={"post-filters-container"}>
                    <ButtonGroup aria-label="outlined primary button group">
                        <Button onClick={() => setPostType("FORUM")}>
                            <FaUsers size={20} style={{marginRight: 5}}/> Forum
                        </Button>
                        <Button onClick={() => setPostType("SALE")}>
                            <AiOutlineShopping size={20} style={{marginRight: 5}}/> Sale
                        </Button>
                        <Button onClick={() => setPostType("DONATE")}>
                            <PiHandHeartBold size={20} style={{marginRight: 5}}/> Donation
                        </Button>
                        {!isMobile && (
                            <>
                                <Button onClick={() => setPostType("BORROW")}>
                                    <TbClockHeart size={20} style={{marginRight: 5}}/> Borrow
                                </Button>
                                <Button onClick={() => setPostType("LOST")}>
                                    <LuPackageSearch size={20} style={{marginRight: 5}}/> Lost
                                </Button>
                            </>
                        )
                        }
                    </ButtonGroup>
                    {isMobile && <ButtonGroup aria-label="outlined primary button group">
                        <Button onClick={() => setPostType("BORROW")}>
                            <TbClockHeart size={20} style={{marginRight: 5}}/> Borrow
                        </Button>
                        <Button onClick={() => setPostType("LOST")}>
                            <LuPackageSearch size={20} style={{marginRight: 5}}/> Lost
                        </Button>
                    </ButtonGroup>}
                </div>
                {arePostsLoading ? (<LoadingPosts/>) : (<>
                    <div className={`posts-container ${postType}`}>
                        {posts?.map((post) => {
                            return (<Post
                                post={post}
                                key={post?._id}
                                reloadPosts={loadPosts}
                            />);
                        })}
                        {posts?.length === 0 && <div className={"no-posts"}>🏜️ No posts here!</div>}
                    </div>
                </>)}
            </div>
        </div>}
    </div>)
        ;
};

export default ProfilePage;