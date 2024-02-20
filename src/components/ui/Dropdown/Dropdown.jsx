import { Settings } from "@mui/icons-material";
import { Button, Menu, styled } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { Fragment } from "react";
import './Dropdown.css';

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#474747' : '#E9E9E9',
    color: theme.palette.text.secondary,
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#303030' : "#ddd",
    },
}));

const Dropdown = ({ children, label, color, icon }) => {

    return (
        <PopupState variant="popover" popupId="pop-rate">
            {(popupState) => (
                <Fragment>
                    <StyledButton variant="contained" color={color || 'primary'} {...bindTrigger(popupState)}>
                            {label || ''}
                            {icon || <Settings />}

                    </StyledButton>
                    <Menu {...bindMenu(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left', // Adjust as needed
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left', // Adjust as needed
                        }}
                        PaperProps={{
                            style: {
                                width: '360px', // Set the width to 'auto'
                                maxHeight: '300px',
                            },
                        }}
                    >
                        {
                            children
                        }
                    </Menu>
                </Fragment>
            )}
        </PopupState>
    );
};

export default Dropdown;