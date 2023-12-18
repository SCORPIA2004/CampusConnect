


/**
 * Renders a chat message with optional image.
 * @param {Object} message - The message object containing text, image, and other properties.
 * @param {boolean} isConsecutive - Indicates if the message is consecutive to the previous message.
 * @returns {JSX.Element} - The rendered chat message component.
 */
import "./styles.css";
import { getTimeSince } from "../../utils/getTimeSince";
import Base64Image from "../Base64Image";

const Message = ({ message, isConsecutive = false, ...rest }) => {

    return (
        <div
            className={`message ${message.isSender ? "left" : "right"} ${
                isConsecutive ? "borderless" : ""
            }`}
            {...rest}
        >
            <div className={`text-message ${message.isSender ? "right" : "left"}`}>
                {message.text}
                {message.image && (
                    <div className={"text-image"}>
                        <Base64Image base64String={message.image} style={{ maxWidth: "90%", marginTop: '10px'}} />
                    </div>
                )}
            </div>
            <div className={`time ${message.isSender ? "left" : "right"}`}>
                {getTimeSince(message.dateSent)}
            </div>
        </div>
    );
};

export default Message;
