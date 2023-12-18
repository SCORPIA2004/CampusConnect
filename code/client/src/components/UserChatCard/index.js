// Purpose: Renders a user chat card component with user information and last message details.
// This component is used to display a user's chat card in a chat application.
// It receives props such as firstName, lastName, email, lastMessage, isRead, onClick, and isActive.
// The component renders the user's name, profile badge, and the last message sent by the user.
// It also displays the time since the last message was sent.
// The last message is displayed with a maximum width of 300 pixels and is right-aligned.
// If the message is not read, a red dot is displayed.
// The component is clickable and triggers the onClick function when clicked.
// The isActive prop determines if the user is currently active.
// The component is exported as the default export.




import Avatar from '@mui/joy/Avatar';
import './styles.css';
import {getTimeSince} from "../../utils/getTimeSince";
import ProfileBadge from "../ProfileBadge";

const UserChatCard = ({firstName, lastName, email, lastMessage, isRead = false , onClick, isActive}) => {
    return (
        <div className="user-card" onClick={onClick}>
            <div className="name-container">
                <ProfileBadge firstName={firstName} lastName={lastName} email={email} isActive={isActive}/>
                <div className={"name"}>
                    {firstName} {lastName}
                    <div className={"date"}>
                        {getTimeSince(lastMessage.dateSent)}
                    </div>
                </div>
            </div>
            <div className="last-message">
                <div style={{wordWrap: "break-word", width: 300, textAlign: "right", marginRight: 10}}>{lastMessage.text}</div>
                {/*{!isRead && <div className={"red-dot"}/>}*/}
            </div>
        </div>
    );
}

export default UserChatCard