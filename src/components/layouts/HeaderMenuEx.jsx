import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import GrassIcon from '@mui/icons-material/Grass';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchBarEx from '../SearchBar/SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, useAuth } from '../../functions/authUtils';
import { useState } from 'react';
import { logout } from '../../functions/authRequest';
import ModalLoginForm from '../Auth/ModalLoginForm';
import ModalSignUpForm from '../Auth/ModalSignUpForm';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { Fragment } from 'react';
import ViewHeadlineSharpIcon from '@mui/icons-material/ViewHeadlineSharp';
// import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import { Badge } from '@mui/material';
import { getUpdateNumber } from '../../utils/changelog';

const HeaderMenuEx = () => {
    const isLogged = useAuth();
    const role = getRole();
    const navigate = useNavigate();
    const updateNumber = getUpdateNumber();
    const badgeClicked = localStorage.getItem('badgeClicked');

    const [activeSignIn, setActiveSignIn] = useState(false);
    const [activeSignUp, setActiveSignUp] = useState(false);

    const handleOpenLoginModal = () => {
        setActiveSignIn(true);
    };

    const handleLogout = () => {
        logout()
        window.location.reload();
        navigate('/');
    };

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
        },
    });

    const handleBadgeClick = () => {
        localStorage.setItem('badgeClicked', String(updateNumber));
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar position="static" className='header-menu' style={{ boxShadow: '0 0 8px #ddd' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <GrassIcon sx={{ display: { xs: 'none', md: 'flex', color: 'green', }, mr: 1 }} />
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
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: '20px' }}>
                            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                                <div class="container-fluid">
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
                                            {isLogged && role === "ADMIN" && (
                                                <li>
                                                    <Link to="/changelog" className='nav-link' onClick={handleBadgeClick}>
                                                        {String(badgeClicked) === String(updateNumber) ? <div className='text-nav'>Changelog</div> : (
                                                            <Badge badgeContent="new" color='success'>
                                                                <div className='text-nav'>Changelog</div>
                                                            </Badge>
                                                        )}
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {!isLogged && (
                                <div>
                                    <Button variant='contained' onClick={handleOpenLoginModal}>Увійти <ArrowForwardIcon /></Button>
                                    <ModalLoginForm activeObj={{ activeSignIn, setActiveSignIn }}
                                        showSignUpModal={setActiveSignUp} />

                                    <ModalSignUpForm activeObj={{ activeSignUp, setActiveSignUp }}
                                        showSignInModal={setActiveSignIn}
                                    />
                                </div>
                            )}
                            {isLogged && (
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {(popupState) => (
                                        <Fragment>
                                            <Button variant="contained" color='success' {...bindTrigger(popupState)}>
                                                <ViewHeadlineSharpIcon />
                                            </Button>
                                            <Menu {...bindMenu(popupState)} className='menu-item'>
                                                {/* <Link to="/profile">
                                                    <MenuItem onClick={popupState.close}> <PersonSharpIcon />Профіль</MenuItem>
                                                </Link> */}
                                                <Link to="/favourite">
                                                    <MenuItem onClick={popupState.close}><FavoriteIcon />Улюблене</MenuItem>
                                                </Link>
                                                <Link to="/">
                                                    <MenuItem onClick={() => handleLogout()}> <ExitToAppSharpIcon />Вихід</MenuItem>
                                                </Link>
                                            </Menu>
                                        </Fragment>
                                    )}
                                </PopupState>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    );
};

export default HeaderMenuEx;