import React, { useEffect } from 'react';
import { withRouter } from "../functions/withRouter";
import jwt_decode from "jwt-decode";
import { logout } from '../functions/authUtils';
import { useNavigate } from "react-router-dom";

const AuthVerify = (props) => {
    const location = props.router.location;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            const decodedJwt = jwt_decode(localStorage.getItem('access_token'));
            if (decodedJwt.exp * 1000 < Date.now()) {
                logout();
                navigate('/');
                localStorage.removeItem('access_token');
            }
        }
    }, [location, navigate]);

    return <></>;
};

export default withRouter(AuthVerify);