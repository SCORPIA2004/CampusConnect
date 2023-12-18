/**
 * Renders an icon with accompanying text as a button.
 * @param {object} props - The component props.
 * @param {ReactNode} props.icon - The icon element to be rendered.
 * @param {string} props.text - The text to be displayed.
 * @param {function} props.onClick - The function to be called when the button is clicked.
 * @param {string} props.location - The location of the button.
 * @param {string} [props.activePostType="NA"] - The active post type.
 * @returns {JSX.Element} The rendered IconTextButton component.
 */
import './styles.css';
import {ButtonBase} from "@mui/material";
import React from "react";

const IconTextButton = ({icon, text, onClick, location, activePostType="NA", ...rest}) => {
    var button = "button";

    if (activePostType === text)
        button = "buttonActive";

    return (
        <ButtonBase className={ button } onClick={onClick} {...rest}>
            <div className={"icon"}>
                {icon}
            </div>
            <div className={"text"}>
                {text}
            </div>
        </ButtonBase>
    )
}

export default IconTextButton;