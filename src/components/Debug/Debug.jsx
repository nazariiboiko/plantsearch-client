import React from "react";
import { useAuth, getRole, getToken, getName, isToken } from '../../functions/authUtils';
import { useSnackbar } from "../../context/SnackbarContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Debug = () => {

    const { handleClick } = useSnackbar();
    const navigate = useNavigate();

    const test = () => {
        handleClick('success');
        navigate(`/`);
    }

    return (
        <div>
            <h3>Debug:</h3>
            <hr></hr>
            <p>Your token: {getToken()}</p>
            <p>Is auth: {String(useAuth())}</p>
            <p>Your name: {String(getName())}</p>
            <p>Your role: {String(getRole())}</p>
            <hr></hr>
            <button onClick={test}>Show Success Snackbar</button>
            <button onClick={() => handleClick('error')}>Show Error Snackbar</button>
            <button onClick={() => handleClick('warning')}>Show Warning Snackbar</button>
            <button onClick={() => handleClick('custom')}>Show Custom Snackbar</button>
        </div>
    );
};

export default Debug;