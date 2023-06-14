import React from 'react';
import HeaderMenu from './HeaderMenu';
import { Outlet } from 'react-router';

const Header = () => {
    return (
        <>
            <HeaderMenu />
            <Outlet />
        </>
    );
};

export default Header;