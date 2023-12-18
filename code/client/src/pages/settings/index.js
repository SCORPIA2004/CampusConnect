/**
 * Renders the settings page for the user to manage their account settings.
 * @returns {JSX.Element} The rendered settings page.
 * @remarks
 * This component displays various settings options for the user to edit their profile, reset their password, and delete their account.
 * The user can update their first name and last name, and save the changes.
 * They can also reset their password by clicking on the "Reset Password" button.
 * To delete their account, they need to enter their email address and click on the "Delete Your Account" button.
 * A confirmation popup is displayed before deleting the account.
 * If the user confirms the deletion, the account is deleted and they are redirected to the login page.
 */

import React, {useEffect, useState} from 'react';
import './styles.css';
import {IoMdSettings} from "react-icons/io";
import {FaUser} from "react-icons/fa";
import {Divider} from "@mui/material";
import TextInput from "../../components/TextInput";
import {handleDeleteAccount, handleUpdateUser} from "../../helpers/apiHelper";
import SimpleButton from "../../components/SimpleButton";
import toast from "react-hot-toast";
import useCheckMobile from "../../hooks/useCheckMobile";
import Popup from "../../components/Popup";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../providers/AuthProvider";

const SettingsPage = () => {
    const [formFirstName, setFormFirstName] = useState('');
    const [formLastName, setFormLastName] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [deleteAccountPopupOpen, setDeleteAccountPopupOpen] = useState(false);
    const isMobile = useCheckMobile();
    const mobileClass = isMobile ? 'mobile' : '';
    const navigate = useNavigate();

    const {email, firstName, lastName, logout, update} = React.useContext(AuthContext);

    useEffect(() => {
        setFormFirstName(firstName)
        setFormLastName(lastName)
    }, [firstName, lastName])

    const handleFirstNameChange = (e) => {
        setFormFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setFormLastName(e.target.value);
    }

    const handleCancelPress = () => {
        setFormFirstName(firstName);
        setFormLastName(lastName);
    }

    const handleSavePress = () => {
        handleUpdateUser(formFirstName, formLastName)
            .then((res) => {
                if (res.status === 200) {
                    update();
                    toast.success("User Updated Successfully!");
                } else {
                    toast.error(res.data)
                }
            })
    }

    const handleResetPasswordPress = () => {
        navigate(`/changePassword/${localStorage.authToken}`)
    }

    const handleDeletePress = () => {
        setDeleteAccountPopupOpen(true);
    }

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value);
    }

    const handleCancelPopupPress = () => {
        setDeleteAccountPopupOpen(false);
    }

    const handleDeletePopupPress = () => {
        if (email !== confirmEmail) {
            toast.error("Emails do not match");
            return;
        }

        handleDeleteAccount()
            .then(async (res) => {
                if (res.status === 200) {
                    localStorage.removeItem('authToken');
                    logout();
                    navigate('/login');
                    toast.success("Account Deleted Successfully!");
                } else {
                    toast.error(res.data)
                }
            })
    }

    return (
        <div className={`settings-outer-container ${mobileClass}`}>
            <Popup isSmall isPopupOpen={deleteAccountPopupOpen} setPopupOpen={setDeleteAccountPopupOpen}>
                <div className={`delete-popup-container ${mobileClass}`}>
                    <div className={'delete-popup-prompt'}>
                        Enter <strong>'{email}'</strong> to confirm deletion of your account.
                    </div>
                    <div className={'delete-popup-text-input'}>
                        <TextInput placeholder={'Confirm Deletion'}
                                   style={{marginTop: '20px'}}
                                   isFocusRed
                                   onChange={handleConfirmEmailChange}
                                   onPaste={(e) => {
                                       e.preventDefault()
                                   }}
                        />
                    </div>
                    <div className={'delete-popup-buttons'}>
                        <SimpleButton label={'Cancel'}
                                      isRed
                                      isOutlined
                                      onClick={handleCancelPopupPress}
                                      style={{marginRight: '12px'}}
                        />
                        <SimpleButton label={'Delete'} isRed onClick={handleDeletePopupPress}/>
                    </div>
                </div>
            </Popup>
            {!deleteAccountPopupOpen && (
                <div className={'settings-container'}>
                    <div className={'settings-heading'}>
                        <IoMdSettings size={20} opacity={0.9} style={{marginRight: '10px'}}/>
                        Settings
                    </div>
                    <Divider style={{width: '100%'}}/>
                    <div className={`edit-profile-container ${mobileClass}`}>
                        <div className={`edit-profile-heading ${mobileClass}`}>
                            <div className={'edit-profile-text'}>
                                Edit Profile
                            </div>
                            <div className={`user-email-text ${mobileClass}`}>
                                <FaUser size={13} opacity={0.9} style={{marginRight: '10px'}}/>
                                {email}
                            </div>
                        </div>
                        <div className={`edit-profile-names ${mobileClass}`}>
                            <div className={`edit-first-name ${mobileClass}`}>
                                First Name
                                <TextInput onChange={handleFirstNameChange}
                                           style={{marginTop: '3px'}}
                                           value={formFirstName}
                                />
                            </div>
                            <div className={`edit-last-name ${mobileClass}`}>
                                Last Name
                                <TextInput onChange={handleLastNameChange}
                                           style={{marginTop: '3px'}}
                                           value={formLastName}
                                />
                            </div>
                        </div>
                        <div className={'edit-profile-buttons'}>
                            <SimpleButton label={'Cancel'}
                                          isRed
                                          isOutlined
                                          onClick={handleCancelPress}
                                          style={{marginRight: '12px'}}
                            />
                            <SimpleButton label={'Save'} isRed onClick={handleSavePress}/>
                        </div>
                    </div>
                    <Divider style={{width: '100%'}}/>
                    <div className={'account-management-container'}>
                        <div className={'account-management-heading'}>
                            Account Management
                        </div>
                        <div className={'account-management-buttons'}>
                            <div className={'reset-password-button'}>
                                Reset Your Password
                                <SimpleButton label={'Reset Password'} isRed onClick={handleResetPasswordPress}/>
                            </div>
                            <div className={'delete-account-button'}>
                                Permanently Delete Your Account
                                <SimpleButton label={'Delete Your Account'} isRed onClick={handleDeletePress}/>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default SettingsPage;