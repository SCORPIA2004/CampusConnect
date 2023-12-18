/**
 * Renders a LostPost component that displays information about a lost post.
 * @param {Object} post - The post object containing information about the lost post.
 * @param {boolean} isExpanded - Indicates whether the post is expanded or not.
 * @param {Function} reloadPosts - Function to reload the list of posts.
 * @param {Function} openEditMenu - Function to open the edit menu for the post.
 * @returns {JSX.Element} The rendered LostPost component.
 */
import "./styles.css";
import { getTimeSince } from "../../utils/getTimeSince";
import { Divider, IconButton } from "@mui/material";
import { AiOutlineShareAlt } from "react-icons/ai";
import useCheckMobile from "../../hooks/useCheckMobile";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import SimpleButton from "../SimpleButton";
import SalesImageCarousel from "../SalesImageCarousel";
import UserTag from "../UserTag";
import Base64Image from "../Base64Image";
import toast from "react-hot-toast";
import { handleDeletePost, handleUpdatePost } from "../../helpers/apiHelper";
import PostOptionsDropdown from "../PostOptionsDropdown";

const LostPost = ({ post, isExpanded, reloadPosts, openEditMenu }) => {
  const isMobile = useCheckMobile();
  const navigate = useNavigate();

  const handleSharePress = (event) => {
    event.stopPropagation(); // prevent event from bubbling up
    const shareData = {
      title: "Check this post out!",
      text: post.title,
      url: `${process.env.REACT_APP_API_URL}/post/${post._id}`,
    };

    if (navigator.share) {
        console.log("HERE shareData ", shareData);
      navigator
        .share(shareData)
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  const handleDeletePress = (event) => {
    event.stopPropagation();
    handleDeletePost(post._id)
      .then((resp) => {
        if (resp.status === 200) {
          toast.success("Post deleted!");
          if (isExpanded) {
            navigate(`/home/${post.type}`);
          } else {
            reloadPosts();
          }
        } else {
          toast.error(resp.data);
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  const handlePostPress = (event) => {
    event.stopPropagation();
    navigate(`/post/${post._id}`);
  };

  const handleToggleResolvedPress = (event) => {
    event.stopPropagation();

    let resolved = !post.isResolved;

    handleUpdatePost(post._id, null, null, null, null, null, null, resolved)
      .then((resp) => {
        if (resp.status === 200) {
          toast.success("Post updated!");
          reloadPosts();
        } else {
          toast.error(resp.data);
        }
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  const handleEditPress = (event) => {
    event.stopPropagation();
    openEditMenu(true);
  };

  const handleStartChat = (email) => {
    navigate(`/chats/${email}`);
  };

  return isExpanded ? (
    <div
      className={`post-card ${isMobile ? "mobile" : ""}`}
      onClick={!isExpanded ? handlePostPress : null}
    >
      <div className={`post-header`}>
        <div className={"post-detail"}>
          <div className={"post-title sales"}>{post.title}</div>
          <PostOptionsDropdown
            post={post}
            handleSharePost={handleSharePress}
            handleDeletePost={handleDeletePress}
            handleToggleResolved={handleToggleResolvedPress}
            handleEditPost={handleEditPress}
          />
        </div>
      </div>
      <Divider />
      <div className={"sales-content"}>
        <div className={"sales-middle-content"}>
          <div className={`post-images sales`}>
            <SalesImageCarousel images={post?.images} />
          </div>
          <div className={"post-price"}>
            {post.isResolved ? "Found" : "Lost"}
            <SimpleButton
              label={"💬 Message Finder"}
              onClick={() => {
                handleStartChat(post.creatorEmail);
              }}
              isRed
              style={{ marginTop: "3px" }}
            />
            <UserTag
              isAnonymous={post.isAnonymous}
              creatorEmail={post.creatorEmail}
              style={{ marginBottom: 5 }}
            />
            <div className={"post-detail"}>
              {getTimeSince(post.dateCreated)}
            </div>
          </div>
        </div>
        <Divider />
        <div className={"post-description sales"}>
          {console.log(post.description)}
          {post.description != null
            ? post.description.split("\n").map((line, index) => (
                <Fragment key={index}>
                  {line}
                  {index !== post.description.split("\n").length - 1 && <br />}
                </Fragment>
              ))
            : "No description provided."}
        </div>
      </div>

      <Divider />

      <div className={"post-actions sales"}>
        <IconButton className={"action-icon-button"} onClick={handleSharePress}>
          <AiOutlineShareAlt />
        </IconButton>
      </div>
    </div>
  ) : (
    <div
      className={`post-card-sales ${isMobile ? "mobile" : ""}`}
      onClick={!isExpanded ? handlePostPress : null}
    >
      <Base64Image
        base64String={post?.images[0]}
        className={"sales-image-display"}
      />
      <Divider style={{ marginBlock: "5px", width: "100%" }} />
      <div className={"post-title small"}>{post.title}</div>
      <Divider style={{marginBlock: "5px", width: "100%"}}/>
      <div className={"tag-time-containter"} onClick={(e) => e.stopPropagation()}>
        <UserTag
            isAnonymous={post.isAnonymous}
            creatorEmail={post.creatorEmail}
            style={{marginBottom: 5}}
        />
        <div>
          {getTimeSince(post.dateCreated)}
        </div>
      </div>
    </div>
  );
};

export default LostPost;
