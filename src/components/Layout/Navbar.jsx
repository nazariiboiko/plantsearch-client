import { AppBar, Box, Button, ButtonGroup, Container, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Toolbar, Typography } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from "../../utils/themeProvider";
import { Link, useNavigate } from "react-router-dom";
import { Brightness7, ExitToApp, Favorite, Grass, Home, Menu, PersonSharp, Search } from "@mui/icons-material";
import "./Navbar.css";
import { useState } from "react";
import SearchBarEx from "../Searchbar/Searchbar";
import AuthModal from "../Auth/AuthModal";
import * as auth from "../../functions/AuthUtils";
import { ROLE_ADMIN } from "../../utils/constants";
import Dropdown from "../ui/Dropdown/Dropdown";

import { useTranslation } from 'react-i18next';
import styled from "@emotion/styled";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLogged = auth.useAuth();
    const role = auth.getRole();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const StyledButton = styled(Button)(({ theme }) => ({
        textTransform: "initial",
        backgroundColor: 'inherit',
        color: 'inherit',
        '&:hover': {
            backgroundColor: 'inherit',
        },
    }));
    
    const StyledTypography = styled(Typography)(({ theme}) => ({
        textTransform: "initial",
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.mode === 'dark'? 'rgba(177, 156, 217, 1)' : 'rgba(200, 200, 200, 0.8)',
        },
    }))

    const handleLogout = () => {
        auth.logout();
        window.location.reload();
        navigate('/');
    }

    const switchLanguage = (languageCode) => {
        i18n.changeLanguage(languageCode);
        localStorage.setItem('language', languageCode);
    };


    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth={false}>
                    <Toolbar disableGutters className='d-flex justify-content-between'>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            color="inherit"
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Grass sx={{ display: { md: 'flex', color: 'white', }, mr: 1 }} />
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            color="inherit"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            onClick={() => navigate('/')}
                        >
                            plantsearch
                        </Typography>

                        <SearchBarEx />

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', }, marginLeft: '20px', justifyContent: 'space-between' }}>
                            <ButtonGroup disableElevation style={{ border: 'none' }}>
                                <StyledButton variant="contained" size="large" onClick={() => navigate('/filter')}>
                                    <StyledTypography className="navbar-text">{t('search')}</StyledTypography>
                                </StyledButton>

                                <StyledButton variant="contained" size="large" onClick={() => navigate('/supplier')}>
                                    <StyledTypography className="navbar-text">{t('suppliers')}</StyledTypography>
                                </StyledButton>

                                <StyledButton variant="contained" size="large" onClick={() => navigate('/gallery')}>
                                    <StyledTypography className="navbar-text">{t('gallery')}</StyledTypography>
                                </StyledButton>

                                {role === ROLE_ADMIN && (
                                    <StyledButton variant="contained" size="large" onClick={() => navigate('/admin#plants')}>
                                        <StyledTypography className="navbar-text">{t('control')}</StyledTypography>
                                    </StyledButton>
                                )}
                            </ButtonGroup>
                        </Box>

                        <Typography sx={{ paddingLeft: 2 }}>{isLogged == true ? (<u>{auth.getName()}</u>) : null}</Typography>

                        <Box sx={{ paddingLeft: 2, paddingRight: 1 }}>
                            {currentLanguage == 'ua' ? (
                                <IconButton onClick={() => switchLanguage('en')}>
                                    <svg width="30px" height="30px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet">
                                        <path fill="#005BBB" d="M32 5H4a4 4 0 0 0-4 4v9h36V9a4 4 0 0 0-4-4z"></path>
                                        <path fill="#FFD500" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-9h36v9z"></path>
                                    </svg>
                                </IconButton>
                            ) :
                                (
                                    <IconButton onClick={() => switchLanguage('ua')}>
                                        <svg width="30" height="30px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet">
                                            <path fill="#B22334" d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z"></path>
                                            <path fill="#EEE" d="M.068 27.679c.017.093.036.186.059.277c.026.101.058.198.092.296c.089.259.197.509.333.743L.555 29h34.89l.002-.004a4.22 4.22 0 0 0 .332-.741a3.75 3.75 0 0 0 .152-.576c.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM0 9zm.555-2l-.003.005L.555 7zM.128 8.044c.025-.102.06-.199.092-.297a3.78 3.78 0 0 0-.092.297zM18 9h18c0-.233-.028-.459-.069-.68a3.606 3.606 0 0 0-.153-.576A4.21 4.21 0 0 0 35.445 7H18v2z"></path>
                                            <path fill="#3C3B6E" d="M18 5H4a4 4 0 0 0-4 4v10h18V5z"></path>
                                            <path fill="#FFF" d="M2.001 7.726l.618.449l-.236.725L3 8.452l.618.448l-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449l-.236.725l.617-.448l.618.448l-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L5 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448l-.236-.725l.618-.449h-.764L7 11l-.235.726zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 11l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448l-.236-.725l.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 15l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 15l-.235.726z"></path>
                                        </svg>
                                    </IconButton>
                                )}

                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex', }, marginLeft: '20px' }}>

                            {isLogged == true ? (
                                <Dropdown icon={<Menu />}>
                                    {/* <Link to="/profile" className='menu-link'>
                                        <MenuItem onClick={PopupState.close}> <PersonSharp />Профіль</MenuItem>
                                    </Link> */}
                                    <Divider />
                                    <Link to="/favourite" className='menu-link'>
                                        <MenuItem><Favorite />{t('favourite')}</MenuItem>
                                    </Link>
                                    <Divider />
                                    <Link className='menu-link'>
                                        <MenuItem onClick={toggleTheme}>
                                            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4Icon />} {t('changeTheme')}
                                        </MenuItem>
                                    </Link>
                                    <Divider />
                                    <Link to="/" className='menu-link'>
                                        <MenuItem onClick={handleLogout}> <ExitToApp />{t('exit')}</MenuItem>
                                    </Link>
                                </Dropdown>) : <><IconButton color="inherit" onClick={toggleTheme}>
                                    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4Icon />}
                                </IconButton><AuthModal /></>}
                        </Box>

                        <Box sx={{ display: { md: 'none' } }}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Menu />
                            </IconButton>
                        </Box>



                        {/* Mobile Menu */}
                        <Drawer
                            variant='contained'
                            anchor="right"
                            open={mobileMenuOpen}
                            onClose={() => setMobileMenuOpen(false)}
                        >
                            <List>
                                <Link to="/" className='nav-link'>
                                    <ListItemButton>
                                        <ListItemIcon><Home /></ListItemIcon>
                                        <ListItemText>{t('mainPage')}</ListItemText>
                                    </ListItemButton>
                                </Link>
                                <Link to="/filter" className='nav-link'>
                                    <ListItemButton>
                                        <ListItemIcon><Search /></ListItemIcon>
                                        <ListItemText>{t('search')}</ListItemText>
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Drawer>
                    </Toolbar>
                </Container>
            </Toolbar >
        </AppBar >
    );
};

export default Header;