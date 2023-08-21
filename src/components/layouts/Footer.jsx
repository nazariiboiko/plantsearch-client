import React from "react";
import './Header.css';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="footer-bg text-center p-3" style={{flexShrink: 0}}>
                © 2023 Copyright
            </div>
        </footer>
    );
};

export default Footer;