import React, {useEffect} from 'react';
import {withRouter} from "../functions/withRouter";
import jwt_decode from "jwt-decode";
import {logout} from "../functions/authRequest";
import {useNavigate} from "react-router-dom";

const AuthVerify = (props) => {
    const location = props.router.location;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('jwt-token')) {
            const decodedJwt = jwt_decode(localStorage.getItem('jwt-token'));
            if (decodedJwt.exp * 1000 < Date.now()) {
                logout();
                navigate('/');
            }
        }
    }, [location, navigate]);

    return <></>;
};

export default withRouter(AuthVerify);
