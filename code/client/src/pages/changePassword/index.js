/**
 * Renders a page for changing the user's password.
 * 
 * This component allows the user to enter a new password and confirm it.
 * If the passwords match, the component sends a request to update the user's password.
 * If the update is successful, the user is redirected to the login page.
 * 
 * @returns {JSX.Element} The ChangePassword component.
 */
import React, {useState} from 'react';
import "./styles.css"
import TextInput from "../../components/TextInput";
import SimpleButton from "../../components/SimpleButton";
import toast from "react-hot-toast";
import {handleGetUser, handleUpdateUser} from "../../helpers/apiHelper";
import {useNavigate} from "react-router-dom";

const ChangePassword = () => {
    // State variables for password and confirm password
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const navigate = useNavigate();

    /**
     * Handles the click event of the submit button.
     * 
     * If the passwords do not match, an error toast is displayed.
     * Otherwise, the function retrieves the user's information, updates the password,
     * and displays a success or error toast based on the response.
     */
    const handleSubmitClick = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
        } else {
            const loadingToast = toast.loading("Updating Password...")
            let token = window.location.href.split('/')[4];
            console.log(token)
            const getUserRes = await handleGetUser()

            if (getUserRes.status === 200) {
                const updateUserRes = await handleUpdateUser(getUserRes.data.firstName, getUserRes.data.lastName, password)
                console.log(updateUserRes)
                toast.remove(loadingToast)
                if (updateUserRes.status === 200) {
                    toast.success(updateUserRes.data)
                    navigate("/login")
                } else {
                    toast.error(updateUserRes.data)
                }
            } else {
                toast.remove(loadingToast)
                toast.error(getUserRes.data)
            }
        }
    };

    return (
        <div className='main-container'>
            <div className="email-container">
                <h1 className={'email-heading'}>Reset Your Password</h1>
                <TextInput
                    placeholder={"Password"}
                    toggleVisible
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{marginTop: 10}}
                />
                <TextInput
                    placeholder={"Confirm password"}
                    toggleVisible
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{marginTop: 10}}
                />
                <SimpleButton label={"Submit"} onClick={handleSubmitClick} isRed/>
            </div>
        </div>
    )
}

export default ChangePassword
