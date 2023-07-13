import {React, useState, Fragment} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import ModalLoginForm from '../Auth/ModalLoginForm';
import ModalSignUpForm from '../Auth/ModalSignUpForm';
import { useAuth, getRole,  } from '../../functions/authUtils';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { logout } from '../../functions/authRequest'
import './Header.css';

const HeaderMenu = () => {

    const isLogged = useAuth();
    const role = getRole();
    const navigate = useNavigate();


    const[showLoginModal, setShowLoginModal] = useState(false);
    const[showSignUpModal, setShowSignUpModal] = useState(false);

    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
    };
    
    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleOpenSignUpModal = () => {
        setShowSignUpModal(true);
    }

    const handleCloseSignUpModal = () => {
        setShowSignUpModal(false);
    }



    const handleLogout = () => {
        logout()
        window.location.reload();
        navigate('/');
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <Link to="/" class="navbar-brand">
            <img src={process.env.PUBLIC_URL + '/logo.jpg'} alt="" width="271" height="45"/>
            </Link>

            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                <li>
                    <SearchBar/>
                </li>
                <li>
                <Link to="/filter" className='nav-link'>
                    <div className='text-nav'>Пошук</div> 
                </Link>
                </li>
                <li>
                <Link to="/supplier" className='nav-link'>
                    <div className='text-nav'>Постачальники</div> 
                </Link>
                </li>
                {isLogged && role === "ADMIN" && (
                <li>
                <Link to="/admin" className='nav-link'>
                    <div className='text-nav'>Керування</div> 
                </Link>
                </li>
                )}
                </ul>
            </div>

            {!isLogged && (
            <div>
                <button className="btn btn-primary ms-auto" onClick={handleOpenLoginModal}>Sign In <i class="fa-solid fa-arrow-right"></i></button>
                <ModalLoginForm showModal={showLoginModal} 
                                onClose={handleCloseLoginModal}
                                showSignUpModal ={handleOpenSignUpModal} />
            
                <ModalSignUpForm showModal={showSignUpModal}
                                onClose={handleCloseSignUpModal}
                />
            </div>
            )}
            {isLogged && (
            <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <Fragment>
                <Button variant="contained" {...bindTrigger(popupState)}>
                <i class="fas fa-bars"></i>
                </Button>
                <Menu {...bindMenu(popupState)} className='menu-item'>
                    <Link to="/profile">
                        <MenuItem onClick={popupState.close}> <i class="fa-solid fa-user menu-icon"></i>Профіль</MenuItem>
                    </Link>
                    <Link to="/favourite">
                        <MenuItem onClick={popupState.close}><i class="fa-sharp fa-solid fa-heart menu-icon"> </i>Улюблене</MenuItem>
                    </Link>
                    <Link to="/">
                        <MenuItem onClick={() => handleLogout()}> <i class="fa-sharp fa-solid fa-right-from-bracket menu-icon"></i>Вихід</MenuItem>
                    </Link>
                </Menu>
                </Fragment>
            )}
            </PopupState>
            )}
        </div>
        </nav>
    );
};

export default HeaderMenu;