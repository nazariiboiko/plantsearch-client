import React from 'react';
import HeaderMenu from './HeaderMenu';
import { Outlet } from 'react-router';
import Footer from './Footer';

const Header = () => {
    return (
        <>
            <HeaderMenu />
            <Outlet />
            <Footer/>
        </>
    );
};

export default Header;