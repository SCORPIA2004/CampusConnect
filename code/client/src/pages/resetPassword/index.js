/**
 * Renders a page for resetting the password.
 * 
 * This component allows the user to enter their email address and submit a request to reset their password.
 * If the user is already logged in, they will be redirected to the home page.
 * 
 * @returns {JSX.Element} The ResetPassword component.
 */
import React, {useEffect, useState} from 'react';
import "./styles.css"
import TextInput from "../../components/TextInput";
import SimpleButton from "../../components/SimpleButton";
import toast from "react-hot-toast";
import {handleForgotPassword} from "../../helpers/apiHelper";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../providers/AuthProvider";

const ResetPassword = () => {
    const [email, setEmail] = useState();
    const {isLoggedIn, isLoading} = React.useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (isLoggedIn) {
                navigate("/")
            }
        }
    }, [isLoading] )

    /**
     * Handles the click event when the user submits the email form.
     * 
     * This function sends a request to the server to reset the password for the provided email address.
     * A loading toast is displayed while the request is being processed.
     * If the request is successful, a success toast is displayed.
     * If the request fails, an error toast is displayed.
     */
    const handleSubmitClick = async () => {
        const loadingToast = toast.loading("Sending Email...")
        const res = await handleForgotPassword(email)
        console.log(res)
        toast.remove(loadingToast)
        if (res.status === 200) {
            toast.success(res.data)
        } else {
            toast.error(res.data)
        }
    };

    return (
        <div className='main-container'>
            <div className="email-container">
                <h1 className={'email-heading'}>Enter Your Email</h1>
                <TextInput className={"email-field"} placeholder={"Email"}
                            onChange={(e) => {setEmail(e.target.value)}}/>
                <SimpleButton label={"Submit"} onClick={handleSubmitClick} isRed/>
            </div>
        </div>
    )
}

export default ResetPassword
