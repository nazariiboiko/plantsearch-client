import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import HeaderMenu from './HeaderMenu';

const Header = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <div style={{ flex: '1 0 auto' }}>
                <HeaderMenu />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Header;