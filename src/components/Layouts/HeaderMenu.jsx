import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { getRole, useAuth } from '../../functions/authUtils';
import { useState } from 'react';
import GrassIcon from '@mui/icons-material/Grass';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, ThemeProvider, createTheme } from '@mui/material';
import SearchBarEx from '../SearchBar/SearchBar';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { ApartmentOutlined, ArrowForward, ExitToApp, Favorite, Home, Search } from '@mui/icons-material';
import ModalLoginForm from '../Auth/ModalLoginForm';
import ModalSignUpForm from '../Auth/ModalSignUpForm';
import { logout } from '../../functions/authRequest';
import Popup from '../ui/Popup/Popup';
// Other imports...

const HeaderMenu = () => {
    const isLogged = useAuth();
    const role = getRole();
    const navigate = useNavigate();
    const [activeSignIn, setActiveSignIn] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMobileMenuOpen = () => {
        setMobileMenuOpen(true);
    };

    const handleMobileMenuClose = () => {
        setMobileMenuOpen(false);
    };

    const handleOpenLoginModal = () => {
        setActiveSignIn(true);
    };

    const handleLogout = () => {
        logout()
        window.location.reload();
        navigate('/');
    };

    const whiteTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
        },
    });

    // ... Other code ...

    return (
        <ThemeProvider theme={whiteTheme}>
            <AppBar position="static" className='header-menu' style={{ boxShadow: '0 0 8px #ddd' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters className='d-flex justify-content-between'>
                        {/* ... Logo and Search Bar ... */}
                        <Link to={'/'}>
                            <GrassIcon sx={{ display: { md: 'flex', color: 'green', }, mr: 1 }} />
                        </Link>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'green',
                                textDecoration: 'none',
                            }}
                        >
                            plantsearch
                        </Typography>
                        <SearchBarEx />
                        {/* Mobile Menu Toggle */}
                        <Box sx={{ display: { md: 'none' }, marginLeft: '15px' }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMobileMenuOpen}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', }, marginLeft: '20px', justifyContent: 'space-between' }}>
                            <nav class="d-flex justify-content-between navbar navbar-expand-lg navbar-light bg-light">
                                <div class="d-flex container-fluid">
                                    <div class="collapse navbar-collapse" id="navbarNav">
                                        <ul class="navbar-nav">
                                            <li>
                                                <Link to="/filter" className='nav-link'>
                                                    <div className='text-nav'>Пошук</div>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/supplier" className='nav-link'>
                                                    <div className='text-nav'>Розсадники</div>
                                                </Link>
                                            </li>
                                            {isLogged && role === "ADMIN" && (
                                                <li>
                                                    <Link to="/admin#plants" className='nav-link'>
                                                        <div className='text-nav'>Керування</div>
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                            <div style={{ marginTop: '10px' }}>
                                {isLogged ?
                                    (<Popup color="success" icon={<MenuIcon />}>
                                        {/* <Link to="/profile">
                                                    <MenuItem onClick={popupState.close}> <PersonSharp />Профіль</MenuItem>
                                                </Link> */}
                                        <Link to="/favourite">
                                            <MenuItem><Favorite />Улюблене</MenuItem>
                                        </Link>
                                        <Link to="/">
                                            <MenuItem onClick={() => handleLogout()}> <ExitToApp />Вихід</MenuItem>
                                        </Link>
                                    </Popup>) :
                                    (
                                        <div>
                                            <Button variant='contained' onClick={handleOpenLoginModal}>Увійти<ArrowForward /></Button>
                                            <ModalLoginForm activeObj={{ activeSignIn, setActiveSignIn }}
                                                showSignUpModal={setActiveSignUp} />
                                            <ModalSignUpForm activeObj={{ activeSignUp, setActiveSignUp }}
                                                showSignInModal={setActiveSignIn}
                                            />
                                        </div>
                                    )}
                            </div>
                        </Box>

                        {/* Mobile Menu */}
                        <Drawer
                            variant='contained'
                            anchor="right"
                            open={mobileMenuOpen}
                            onClose={handleMobileMenuClose}
                        >
                            <List>
                                <Link to="/" className='nav-link'>
                                    <ListItemButton>
                                        <ListItemIcon><Home /></ListItemIcon>
                                        <ListItemText>Головна сторінка</ListItemText>
                                    </ListItemButton>
                                </Link>
                                <Link to="/filter" className='nav-link'>
                                    <ListItemButton>
                                        <ListItemIcon><Search /></ListItemIcon>
                                        <ListItemText>Пошук</ListItemText>
                                    </ListItemButton>
                                </Link>
                                <Link to="/supplier" className='nav-link'>
                                    <ListItemButton>
                                        <ListItemIcon><ApartmentOutlined /></ListItemIcon>
                                        <ListItemText>Розсадники</ListItemText>
                                    </ListItemButton>
                                </Link>
                                {isLogged ?
                                    (<>
                                        {role === "ADMIN" && (
                                            <Link to="/admin#plants" className='nav-link'>
                                                <ListItemButton>
                                                    <ListItemIcon><ConstructionIcon /></ListItemIcon>
                                                    <ListItemText>Керування</ListItemText>
                                                </ListItemButton>
                                            </Link>
                                        )}
                                        <Link to="/favourite" className='nav-link'>
                                            <ListItemButton>
                                                <ListItemIcon><Favorite /></ListItemIcon>
                                                <ListItemText>Улюблене</ListItemText>
                                            </ListItemButton>
                                        </Link>
                                        <Divider component="li" />
                                        <Link to="/" className='nav-link'>
                                            <ListItemButton onClick={() => handleLogout()}>
                                                <ListItemIcon><ExitToApp /></ListItemIcon>
                                                <ListItemText>Вихід</ListItemText>
                                            </ListItemButton>
                                        </Link>
                                    </>
                                    ) :
                                    (
                                        <>
                                            <Divider component="li" />
                                            <ListItemButton onClick={handleOpenLoginModal}>
                                                <ListItemIcon><ArrowForward /></ListItemIcon>
                                                <ListItemText>Увійти</ListItemText>
                                            </ListItemButton>
                                            <ModalLoginForm activeObj={{ activeSignIn, setActiveSignIn }}
                                                showSignUpModal={setActiveSignUp} />
                                            <ModalSignUpForm activeObj={{ activeSignUp, setActiveSignUp }}
                                                showSignInModal={setActiveSignIn}
                                            />
                                        </>
                                    )}
                            </List>
                        </Drawer>
                    </Toolbar>
                </Container>
            </AppBar >
        </ThemeProvider >
    );
};

export default HeaderMenu;