/**
 * Renders a profile badge component.
 * 
 * This component displays a profile badge with the user's first name and last name initials as an avatar.
 * It also includes a badge indicating the user's activity status.
 * Clicking on the badge navigates to the user's profile page.
 * 
 * @param {string} firstName - The user's first name.
 * @param {string} lastName - The user's last name.
 * @param {string} email - The user's email address.
 * @param {boolean} isActive - Indicates whether the user is active or not.
 * @param {object} rest - Additional props to be passed to the component.
 * @returns {JSX.Element} The rendered profile badge component.
 * 
 * @remarks
 * This component is used to display a profile badge for a user.
 * It takes the user's first name, last name, email, and activity status as props.
 * The badge color and variant are determined by the activity status.
 * Clicking on the badge triggers navigation to the user's profile page.
 * The avatar displays the user's first name and last name initials.
 */
import "./styles.css"
import {Badge} from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import {useNavigate} from "react-router-dom";

const ProfileBadge = ({firstName, lastName, email, isActive, ...rest}) => {
    const navigate = useNavigate()

    return (
        <Badge
            color={isActive ? "success" : "neutral"}
            variant="solid"
            badgeInset="14%"
            style={{cursor: "pointer"}}
            onClick={() => navigate("/profile/" + email)}
            {...rest}
        >
            <Avatar variant={"solid"} {...rest}>{firstName.charAt(0)}{lastName.charAt(0)}</Avatar>
        </Badge>
    )
}

export default ProfileBadge;