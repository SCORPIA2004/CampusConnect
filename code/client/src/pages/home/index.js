/**
 * Renders the home page of the application.
 * The home page displays a feed of posts and allows users to create new posts, search for posts, and sort posts.
 * The posts are fetched from the server and displayed based on the selected post type.
 * Users can filter the posts by searching for specific keywords and sort the posts based on different criteria.
 * The home page also includes a create post popup for users to create new posts.
 * If the user is not logged in, they will be redirected to the login page.
 */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import './styles.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Post from "../../components/Post";
import { handleGetPosts } from "../../helpers/apiHelper";
import toast from "react-hot-toast";
import useCheckMobile from "../../hooks/useCheckMobile";
import CreatePostPopup from "../../components/CreatePostPopup";
import LoadingPosts from "../../components/Loading Posts";
import { AuthContext } from "../../providers/AuthProvider";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";
import IconTextButton from "../../components/IconTextButton";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = React.useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [arePostsLoading, setPostsLoading] = useState(true);
  const [postType, setPostType] = useState("FORUM");
  const [createPopupOpen, setCreatePopupOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const isMobile = useCheckMobile();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split("/")[2]) {
      console.log(location.pathname.split("/")[2].toUpperCase());
      setPostType(location.pathname.split("/")[2].toUpperCase());
    }
  }, [location]);

  /**
   * Loads the posts based on the selected post type and search parameters.
   * If the user is logged in, the posts are fetched from the server.
   * If the user is not logged in, the posts are not loaded.
   * The loading state is updated accordingly.
   * If an error occurs during the loading process, an error message is displayed.
   * @param {Object} params - The search parameters for loading the posts.
   */
  const loadPosts = async (params) => {
    const paramObject = location.pathname.split("/")[2]
      ? {
          type: location.pathname.split("/")[2].toUpperCase(),
          ...(!params ? { sortByNewest: true } : {}),
          ...params,
        }
      : postType
      ? { type: postType, ...(!params ? { sortByNewest: true } : {}), isComment: false, ...params }
      : { type: "FORUM", ...(!params ? { sortByNewest: true } : {}), isComment: false, ...params };

    if (!isLoading && isLoggedIn) {
      setPostsLoading(true);
      try {
        const resp = await handleGetPosts(paramObject);

        if (resp.status === 200) {
          setPosts(Array.isArray(resp.data) ? resp.data : []);
        } else {
          // Handle non-200 status codes, e.g., show an error message
          toast.error(`Error: ${resp.status}`);
        }
      } catch (error) {
        // Handle other errors, e.g., network issues
        toast.error(error.message);
      } finally {
        setPostsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadPosts();
  }, [postType, location]);

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        navigate("/login");
      }

      loadPosts();
    }
  }, [isLoading]);

  /**
   * Handles the click event for creating a new post.
   * Opens the create post popup.
   */
  const handleCreatePostClick = () => {
    setCreatePopupOpen(true);
  };

  /**
   * Renders the create post component.
   * Displays a clickable container for creating a new post.
   */
  const CreatePostComponent = () => {
    return (
      <div
        onClick={handleCreatePostClick}
        className={`create-post-bar-container ${isMobile ? "mobile" : ""}`}
      >
        🤔✍️ Make a post...
      </div>
    );
  };

  const searchBarRef = useRef(null); // Create a ref for the search bar
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchText]);

  /**
   * Handles the click event for expanding/collapsing the search bar.
   * Toggles the search bar's expanded state.
   * @param {Event} event - The click event.
   */
  const handleSearchClick = useCallback(
    (event) => {
      event.stopPropagation(); // Prevent global click listener from triggering
      setIsSearchExpanded(!isSearchExpanded);
    },
    []
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setIsSearchExpanded(false); // Collapse the search bar
        // Clear the search text
        // setSearchText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleSearchClick]);

  /**
   * Renders the search bar component.
   * Displays a search input field or a search button based on the search bar's expanded state.
   */
  const SearchBarComponent = () => {
    return (
      <div
        ref={searchBarRef}
        onClick={handleSearchClick}
        className="search-bar-container"
      >
        {isSearchExpanded ? (
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="search-input"
            onClick={(event) => event.stopPropagation()}
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        ) : (
          <IconTextButton icon={<FaMagnifyingGlass />} text={"Search"} />
        )}
      </div>
    );
  };

  /**
   * Sorts the posts based on the selected sort type.
   * The posts are reloaded with the new sort parameter.
   * @param {string} sortType - The sort type.
   */
  const sortPosts = async (sortType) => {
    let sortParam = "";

    switch (sortType) {
      case "price":
        sortParam = "sortByPrice";
        break;
      case "likes":
        sortParam = "sortByLikes";
        break;
      case "borrowDuration":
        sortParam = "sortByBorrowDuration";
        break;
      case "time":
        sortParam = "sortByNewest";
        break;
      default:
        break;
    }

    loadPosts({ [sortParam]: true });
  };

  /**
   * Renders the sort dropdown menu component.
   * Displays different sort options based on the selected post type.
   * @param {Object} setOpen - The state setter for opening/closing the sort menu.
   */
  const SortDropdownMenu = ({ setOpen }) => {
    return (
      <div className="sort-dropdown-menu">
        {postType === 'SALE' && (
          <>
            <div onClick={() => { sortPosts("price"); setOpen(false); }}>By Price (Lowest to Highest)</div>
          </>
        )}
        {postType === 'FORUM' && (
          <>
            <div onClick={() => { sortPosts("likes"); setOpen(false); }}>By Most Liked</div>
          </>
        )}
        {postType === 'BORROW' && (
          <>
            <div onClick={() => { sortPosts("borrowDuration"); setOpen(false); }}>By Borrow Duration</div>
          </>
        )}
        <div onClick={() => { sortPosts("time"); setOpen(false); }}>By Newest</div>
      </div>
    );
  };

  return (
    <div className={"main-container"}>
      <div className={`feed-container ${postType}`}>
        {arePostsLoading ? (
          <LoadingPosts />
        ) : (
          <>
            <CreatePostPopup
              page={postType}
              isPopupOpen={createPopupOpen}
              setPopupOpen={setCreatePopupOpen}
              reloadPosts={loadPosts}
            />
            <CreatePostComponent />
            <div className={"search-filter-container"}>

              <SearchBarComponent />

              <IconTextButton
                icon={<FaSort />}
                text={"Sort"}
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                style={{ marginRight: 5 }}
              />
              {isSortMenuOpen && <SortDropdownMenu setOpen={setIsSortMenuOpen} />}
            </div>

            <div className={`posts-container ${postType}`}>
              {posts
                .filter((post) =>
                  post.title.toLowerCase().includes(searchText.toLowerCase())
                )
                .map((post) => {
                  if (!post.isResolved) return (
                    <Post post={post} key={post?._id} reloadPosts={loadPosts} />
                  );
                })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
