import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSnackbar } from '../../context/SnackbarContext';

const AlertSnackbar = () => {
  const { open, handleClose, snackbarType } = useSnackbar();

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const getAlertSeverity = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {/* Use the snackbarType to set the MuiAlert severity */}
        <Alert onClose={handleClose} severity={getAlertSeverity(snackbarType)} sx={{ width: '100%' }}>
          {/* Customize the Snackbar content based on the type */}
          {snackbarType === 'success' && 'This is a success message!'}
          {snackbarType === 'error' && 'An error occurred!'}
          {snackbarType === 'warning' && 'This is a warning!'}
          {snackbarType === 'custom' && 'A custom message!'}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertSnackbar;