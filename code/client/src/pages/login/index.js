/**
 * Renders the login page.
 * 
 * This component allows users to log in to the application by providing their email and password.
 * It also provides options for registering a new account and resetting the password.
 * 
 * @returns {JSX.Element} The login page component.
 */

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import "./styles.css"
import TextInput from "../../components/TextInput";
import SimpleButton from "../../components/SimpleButton";
import toast from "react-hot-toast";
import {handleLogin, handleRegister} from "../../helpers/apiHelper";
import {AuthContext} from "../../providers/AuthProvider";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const {isLoggedIn, isLoading, login} = React.useContext(AuthContext);

    useEffect(() => {
        if (!isLoading) {
            if (isLoggedIn) {
                navigate("/")
            }
        }
    }, [isLoading])

    const handleLoginClick = async () => {
        const loadingToast = toast.loading("Logging in...")
        const res = await handleLogin(email, password)
        console.log(res)
        toast.remove(loadingToast)
        if (res.status === 200) {
            login(res.data.authToken)
            toast.success("Logged in.")
            navigate('/');
        } else {
            toast.error(res.data)
        }
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Redirect to the /register page
    };

    const handleForgotPasswordClick = () => {
        navigate('/resetPassword')
    }

    return (
        <div className='main-container'>
            <div className="login-container">
                <h1 className={'login-heading'}>Login</h1>
                <TextInput className={"email-field"} placeholder={"Email"}
                           onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput placeholder={"Password"} toggleVisible style={{marginTop: 10}}
                           onChange={(e) => setPassword(e.target.value)}
                />
                <div className={'reset-password'} onClick={handleForgotPasswordClick}>Forgot your password?</div>
                <SimpleButton label={"Login"} onClick={handleLoginClick} isRed/>
                <div className={'register-text'}>New here? <b className={'register-prompt'}
                                                              onClick={handleRegisterClick}> Register</b>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
