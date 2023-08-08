import React from 'react';
import HeaderMenu from './HeaderMenu';
import { Outlet } from 'react-router';
import Footer from './Footer';
import HeaderMenuEx from './HeaderMenuEx';

const Header = () => {
    return (
        <>
            <HeaderMenuEx />
            <Outlet />
            <Footer/>
        </>
    );
};

export default Header;