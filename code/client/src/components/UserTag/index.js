/**
 * Renders a user tag component.
 * @param isAnonymous - Indicates whether the user is anonymous.
 * @param creatorEmail - The email of the user who created the tag.
 * @param rest - Additional props to be passed to the component.
 * @returns The rendered user tag component.
 * @remarks
 * This component is responsible for rendering a user tag based on the provided parameters.
 * If the user is anonymous and no creator email is provided, an anonymous tag is displayed.
 * Otherwise, the user's role and name are displayed.
 * The user's role is determined using the creator email or the authenticated user's email.
 * The user's name is determined using the creator email or the authenticated user's email.
 * The component applies CSS styles defined in the "styles.css" file.
 */
import { BsIncognito } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { getRoleFromEmail, getNameFromEmail } from "../../utils/getRoleFromEmail";
import "./styles.css"

const UserTag = ({ isAnonymous, creatorEmail, ...rest}) => {
    const { email } = useContext(AuthContext);
    const userRole = getRoleFromEmail(creatorEmail || email);
    const userName = getNameFromEmail(creatorEmail || email);

    return (
        <div className={"user-tag"} {...rest}>
            {isAnonymous && !creatorEmail ? (
                <>
                    <BsIncognito />
                    <div style={{ marginLeft: 2 }}>Anonymous</div>
                </>
            ) : (
                <>
                    <div className={"role-banner"}>{userRole}</div>
                    {userName}
                </>
            )}
        </div>
    );
};

export default UserTag;