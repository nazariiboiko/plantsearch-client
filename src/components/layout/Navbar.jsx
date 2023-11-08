import { AppBar, Box, Button, Container, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, MenuItem, Toolbar, Typography } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from "../../utils/themeProvider";
import { Link, useNavigate } from "react-router-dom";
import { ApartmentOutlined, Brightness7, ExitToApp, Favorite, Grass, Home, Menu, PersonSharp, Search } from "@mui/icons-material";
import "./Navbar.css";
import { useState } from "react";
import SearchBarEx from "../searchbar/Searchbar";
import AuthModal from "../Auth/AuthModal";
import * as auth from "../../functions/authUtils";
import { ROLE_ADMIN } from "../../utils/constants";
import Dropdown from "../ui/Dropdown/Dropdown";
import PopupState from "material-ui-popup-state";

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLogged = auth.useAuth();
    const role = auth.getRole();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        window.location.reload();
        navigate('/');
    }


    return (
        <AppBar position="static">
            <Toolbar>
                <Container maxWidth="xl">
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
                        >
                            plantsearch
                        </Typography>

                        <SearchBarEx />

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', }, marginLeft: '20px', justifyContent: 'space-between' }}>
                            <ul class="navbar-ul">
                                <li>
                                    <Link to="/filter" className='navbar-link'>
                                        <div className='navbar-text'>Пошук</div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/supplier" className='navbar-link'>
                                        <div className='navbar-text'>Розсадники</div>
                                    </Link>
                                </li>
                                {role === ROLE_ADMIN && (
                                    <li>
                                        <Link to="/admin#plants" className='navbar-link'>
                                            <div className='navbar-text'>Керування</div>
                                        </Link>
                                    </li>
                                )}
                            </ul>

                        </Box>


                        <Box sx={{ display: { xs: 'none', md: 'flex', }, marginLeft: '20px' }}>
                            {isLogged == true ? (
                                <Dropdown icon={<Menu />}>
                                    <Link to="/profile" className='menu-link'>
                                        <MenuItem onClick={PopupState.close}> <PersonSharp />Профіль</MenuItem>
                                    </Link>
                                    <Divider />
                                    <Link to="/favourite" className='menu-link'>
                                        <MenuItem><Favorite />Улюблене</MenuItem>
                                    </Link>
                                    <Divider />
                                    <Link className='menu-link'>
                                        <MenuItem onClick={toggleTheme}>
                                            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4Icon />} Змінити тему
                                        </MenuItem>
                                    </Link>
                                    <Divider />
                                    <Link to="/" className='menu-link'>
                                        <MenuItem onClick={handleLogout}> <ExitToApp />Вихід</MenuItem>
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
                                        <ListItemText>Головна сторінка</ListItemText>
                                    </ListItemButton>
                                </Link>
                                <Link to="/filter" className='nav-link'>
                                    <ListItemButton>
                                        <ListItemIcon><Search /></ListItemIcon>
                                        <ListItemText>Пошук</ListItemText>
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Drawer>
                    </Toolbar>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;