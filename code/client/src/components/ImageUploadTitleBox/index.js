/**
 * Renders a title box for an image upload.
 * @param {string} fileName - The name of the file.
 * @param {function} removeFile - The function to remove the file.
 * @returns {JSX.Element} - The rendered title box component.
 * @description
 * This component renders a title box for an image upload. It displays the file name and provides a button to remove the file.
 */

import React from "react";
import "./styles.css";
import { RxCross2 } from "react-icons/rx";
import { IconButton } from "@mui/material";

const ImageUploadTitleBox = ({fileName, removeFile}) => {

    return (
        <div className={'file-name-container'}>
            <div className={'file-remove-button'}>
                <IconButton size={'small'} onClick={removeFile} className={'remove-icon-button'}>
                    <RxCross2 size={15} />
                </IconButton>
            </div>
            <div className={'file-name'}>
                {fileName}
            </div>
        </div>
    );
};

export default ImageUploadTitleBox;
