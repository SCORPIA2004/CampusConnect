

/**
 * Renders a loading state for posts.
 * 
 * This component is used to display a loading state for posts while they are being fetched from an API.
 * It renders a container with multiple instances of the PostSkeleton component, which represents a skeleton placeholder for a post.
 * 
 * @returns {JSX.Element} The loading state for posts.
 */
import PostSkeleton from "../Post/PostSkeleton";
import React from "react";

const LoadingPosts = () => {

    return (
        <div className={'feed-container'}>
            <PostSkeleton/>
            <PostSkeleton/>
            <PostSkeleton/>
        </div>
    )

}

export default LoadingPosts;