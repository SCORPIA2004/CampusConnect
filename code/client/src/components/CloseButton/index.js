/**
 * Renders a close button component.
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The click event handler.
 * @param {boolean} [props.isRed=false] - Determines if the close icon should be red.
 * @returns {JSX.Element} The close button component.
 */
import "./styles.css";
import {IconButton} from "@mui/material";
import {IoClose} from "react-icons/io5";

const CloseButton = ({onClick, isRed = false, ...rest}) => {
    return (
        <IconButton onClick={onClick} styles={{padding: 1}} {...rest}>
            <IoClose color={isRed ? "red" : ""} />
        </IconButton>
    )
}

export default CloseButton;