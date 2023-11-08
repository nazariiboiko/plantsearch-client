import React, { createContext, useState, useContext } from 'react';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (type, msg) => {
        setSnackbarType(type);
        setSnackbarMessage(msg);
        setOpen(true);
    };

    return (
        <SnackbarContext.Provider value={{ open, handleClose, handleClick, snackbarType, snackbarMessage }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export default SnackbarProvider;