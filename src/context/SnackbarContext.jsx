import React, { createContext, useState, useContext } from 'react';

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = (type) => {
        setSnackbarType(type);
        setOpen(true);
    };

    return (
        <SnackbarContext.Provider value={{ open, handleClose, handleClick, snackbarType }}>
            {children}
        </SnackbarContext.Provider>
    );
};

export default SnackbarContext;