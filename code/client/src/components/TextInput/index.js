


/**
 * Renders a text input component with optional password visibility toggle.
 * @param {boolean} isFocusRed - Determines if the input should have red focus styling.
 * @param {string} placeholder - The placeholder text for the input.
 * @param {function} onChange - The callback function to handle input changes.
 * @param {boolean} toggleVisible - Determines if the password visibility toggle should be shown.
 * @param {...any} rest - Additional props to be passed to the input element.
 * @returns {JSX.Element} The rendered text input component.
 */
import React, { useState } from 'react';
import './styles.css';
import { IconButton } from '@mui/material';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const TextInput = ({ isFocusRed = false, placeholder, onChange, toggleVisible, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);
    const focusClass = isFocusRed ? 'focus-red' : '';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`text-input-container ${focusClass}`}>
            <input
                type={toggleVisible ? (showPassword ? 'text' : 'password') : 'text'}
                placeholder={placeholder}
                onChange={onChange}
                value={rest.value}
                {...rest}
            />
            {toggleVisible && (
                <IconButton
                    className="password-toggle-button"
                    onClick={togglePasswordVisibility}
                >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </IconButton>
            )}
        </div>
    );
};

export default TextInput;