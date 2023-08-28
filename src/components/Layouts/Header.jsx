import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import HeaderMenuEx from './HeaderMenuEx';

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
                <HeaderMenuEx />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Header;