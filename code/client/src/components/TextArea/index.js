


/**
 * Renders a textarea component with customizable placeholder, value, and onChange event.
 * @param {string} value - The value of the textarea.
 * @param {string} placeholder - The placeholder text for the textarea.
 * @param {function} onChange - The event handler for the onChange event.
 * @param {object} rest - Additional props to be passed to the textarea element.
 * @returns {JSX.Element} The rendered textarea component.
 */
import React, { useState } from 'react';
import './styles.css';
import { IconButton } from '@mui/material';

const TextArea = ({ value, placeholder, onChange, ...rest }) => {
    return (
        <div className="text-area-container">
            <textarea
                placeholder={placeholder}
                onChange={onChange}
                {...rest}
            >
                {value}
            </textarea>
        </div>
    );
};

export default TextArea;