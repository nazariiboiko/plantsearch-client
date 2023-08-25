import { Settings } from "@mui/icons-material";
import { Button, Menu } from "@mui/material";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { Fragment } from "react";

const Popup = ({children}) => {

    return (
        <PopupState variant="popover" popupId="pop-rate">
            {(popupState) => (
                <Fragment>
                    <Button variant="contained" color='primary' {...bindTrigger(popupState)}>
                        <Settings />
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