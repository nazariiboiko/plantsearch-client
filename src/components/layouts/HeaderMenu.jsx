import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import ModalLoginForm from '../auth/ModalLoginForm'
import './Header.css'

const HeaderMenu = () => {

    const[showLoginModal, setShowLoginModal] = useState(false);

    const handleOpenModal = () => {
        setShowLoginModal(true);
    };
    
    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

        <button
        className="btn dropdown-toggle"
        type="button"
        id="navbarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
      </button>

            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#"><i class="fas fa-user"></i> Profile</a></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-cog"></i> Settings</a></li>
            <li><div class="dropdown-divider"></div></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>

            <a class="navbar-brand" href="#">
            <Link to="/">
            <img src={process.env.PUBLIC_URL + '/logo.jpg'} alt="" width="271" height="45"/>
            </Link>
            </a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <SearchBar/>

            <button className="btn btn-primary ms-auto" onClick={handleOpenModal}>Sign In <i class="fa-solid fa-arrow-right"></i></button>
            <ModalLoginForm showModal={showLoginModal} onClose={handleCloseModal} />
            </div>
        </div>
        </nav>
    );
};

export default HeaderMenu;