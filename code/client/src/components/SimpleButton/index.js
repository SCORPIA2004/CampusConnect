



/**
 * SimpleButton Component
 * 
 * Renders a simple button with customizable properties.
 * 
 * @param {function} onClick - The function to be called when the button is clicked.
 * @param {string} label - The label text of the button.
 * @param {boolean} isRed - Determines if the button should have a red color.
 * @param {boolean} isOutlined - Determines if the button should have an outlined style.
 * @param {boolean} isSmall - Determines if the button should have a small size.
 * @param {string} imagePath - The path to the image to be displayed on the button.
 * @param {object} rest - Additional props to be passed to the ButtonBase component.
 * 
 * @returns {JSX.Element} The rendered SimpleButton component.
 * 
 * @remarks
 * This component is used to render a simple button with customizable properties.
 * It accepts an onClick function, a label text, and various boolean flags to customize the button's appearance.
 * The button can be styled with a red or blue color, with or without an outlined style, and with a small size.
 * An optional image can also be displayed on the button.
 * The component uses the ButtonBase component from the @mui/material library.
 */
import React from "react";
import { ButtonBase } from "@mui/material";
import "./styles.css";

const SimpleButton = ({
  onClick,
  label,
  isRed = false,
  isOutlined = false,
  isSmall,
  imagePath,
  ...rest
}) => {
  const buttonClass = isRed ? "logo-red" : "logo-blue";
  const outlined = isOutlined ? "outlined" : "";
  const smallButton = isSmall ? "small" : "";

  return (
    <ButtonBase
      className={`simple-button ${smallButton} ${buttonClass} ${outlined}`}
      onClick={onClick}
      {...rest}
    >
      {/* <img src={imagePath} alt="button-image" width={23} style={{ margin: '4px' }} /> */}
      {label}
    </ButtonBase>
  );
};

export default SimpleButton;
