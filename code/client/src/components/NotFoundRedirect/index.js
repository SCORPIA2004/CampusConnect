

/**
 * Redirects to the home page when the component is rendered.
 * @remarks
 * This component is used to redirect the user to the home page when the component is rendered.
 * It utilizes the `useNavigate` hook from the `react-router-dom` library to perform the redirection.
 * The redirection is triggered in the `useEffect` hook, which runs once when the component is mounted.
 */
import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const NotFoundRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/')
    }, [])

    return null;
};

export default NotFoundRedirect