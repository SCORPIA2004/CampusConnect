

/**
 * Renders a skeleton loading animation for a post card.
 * @param {number} height - The height of the skeleton animation.
 * @returns {JSX.Element} - The rendered skeleton loading animation.
 */
import './styles.css';
import useCheckMobile from "../../hooks/useCheckMobile";
import {Divider, Skeleton} from "@mui/material";

const PostSkeleton = ({height}) => {
    const isMobile = useCheckMobile();

    const randomHeight = Math.floor(Math.random() * (100 - 20 + 1)) + 10;

    return (
        <div className={`post-card ${isMobile ? 'mobile' : ''}`}>
            <Skeleton height={height ? height : randomHeight} animation="wave" className={"skeleton-override"} />
            <Divider />
            <Skeleton height={height ? height*3 :  randomHeight * 3}  animation="wave" className={"skeleton-override"}/>
        </div>
    );
}

export default PostSkeleton