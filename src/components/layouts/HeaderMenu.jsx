import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ModalLoginForm from '../auth/ModalLoginForm'
import { useAuth, getRoles, getToken,  } from '../../functions/authUtils';
import { logout } from '../../functions/authRequest'
import { useNavigate } from 'react-router-dom';
import './Header.css'
import ModalSignUpForm from '../auth/ModalSignUpForm';

const HeaderMenu = () => {

    const isLogged = useAuth();
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

            <a class="navbar-brand" href="#">
            <Link to="/">
            <img src={process.env.PUBLIC_URL + '/logo.jpg'} alt="" width="271" height="45"/>
            </Link>
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <SearchBar/>
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
                <div>
                <button
                className="btn dropown-toggle"
                type="button"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false" 
               ><i class="fas fa-bars"></i></button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#"><i class="fas fa-user"></i> Profile</a></li>
                    <li><div class="dropdown-divider"></div></li>
                    <li><button class="dropdown-item" href="#" onClick={handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</button></li>
                    </ul>
                </div>
            )}
        </div>
        </nav>
    );
};

export default HeaderMenu;