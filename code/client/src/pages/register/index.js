/**
 * Renders the RegisterPage component.
 * 
 * This component provides a user interface for user registration.
 * It includes input fields for first name, last name, email, password, and confirm password.
 * The component validates the password and confirm password fields to ensure they match.
 * Upon successful registration, the user is redirected to the login page.
 * 
 * @returns {JSX.Element} The rendered RegisterPage component.
 */
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import TextInput from "../../components/TextInput";
import "./styles.css"
import SimpleButton from "../../components/SimpleButton";
import toast from 'react-hot-toast';
import {handleCreateUser} from "../../helpers/apiHelper";
import useVerifyAuthToken from "../../hooks/useVerifyAuthToken";
import {AuthContext} from "../../providers/AuthProvider";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const {isLoggedIn, isLoading} = React.useContext(AuthContext);


    useEffect(() => {
        if (!isLoading) {
            if (isLoggedIn) {
                navigate("/")
            }
        }
    }, [isLoading] )

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
        } else {
            const loadingToast = toast.loading("Registering...")
            const res = await handleCreateUser(firstName, lastName, email, password)
            toast.remove(loadingToast)
            if (res.status === 200) {
                toast.success(res.data)
                navigate('/login');
            } else {
                toast.error(res.data)
            }
        }
    };


    return (
        <div className='main-container'>
            <div className="register-container">
                <h1 className={'register-heading'}>Register</h1>
                <div className='name-input-containers'>
                    <TextInput
                        className={"email-field"}
                        placeholder={"First name"}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{width: 110}}
                    />
                    <TextInput
                        className={"email-field"}
                        placeholder={"Last name"}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{width: 110}}
                    />
                </div>
                <TextInput
                    className={"email-field"}
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{marginTop: 10}}
                />
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
                <div className={"disclaimer"}>*to ensure security and exclusivity users are only allowed to sign up with
                    their Bilkent emails
                </div>
                <SimpleButton label={"Register"} onClick={handleRegisterClick} isRed/>
                <div className={'register-text'}>Already have an account?<b className={'register-prompt'}
                                                                            onClick={handleLoginClick}> Login </b></div>
            </div>
        </div>
    )
}

export default RegisterPage;
