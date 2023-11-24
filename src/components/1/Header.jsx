import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar.jsx';
import Footer from './Footer';

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
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Header;