import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSnackbar } from '../../context/SnackbarContext';

const AlertSnackbar = () => {
  const { open, handleClose, snackbarType, snackbarMessage } = useSnackbar();

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
        <Alert onClose={handleClose} severity={getAlertSeverity(snackbarType)} sx={{ width: '100%' }}>
          {snackbarType === 'success' && snackbarMessage}
          {snackbarType === 'error' && snackbarMessage}
          {snackbarType === 'warning' && snackbarMessage}
          {snackbarType === 'info' && snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertSnackbar;