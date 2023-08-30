import { Settings } from "@mui/icons-material";
import { Button, Menu } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { Fragment } from "react";
import './Popup.css';

const Popup = ({ children, label, color, icon }) => {

    return (
        <PopupState variant="popover" popupId="pop-rate">
            {(popupState) => (
                <Fragment>
                    <Button variant="contained" color={color || 'primary'} {...bindTrigger(popupState)}>
                        <div className="popup-text between">
                            <>{label || ''}</>
                            <>{icon || <Settings />}</>
                        </div>

                    </Button>
                    <Menu {...bindMenu(popupState)} className='menu-item'>
                        {
                            children
                        }
                    </Menu>
                </Fragment>
            )}
        </PopupState>
    );
};

export default Popup;