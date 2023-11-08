import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "15px",
};

const ModalTransition = ({ open, handleOpen, handleClose, children, title }) => {
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {title &&
                            (<>
                                <Typography variant="h4" color="primary" sx={{ padding: "12px 0 0", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {title}
                                </Typography>
                                < hr />
                            </>)}
                        {children}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ModalTransition;