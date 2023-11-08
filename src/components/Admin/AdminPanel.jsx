import { useEffect, useState } from "react";
import './Admin.css';
import { Box, Grid } from '@mui/material';
import { ApartmentOutlined, GrassOutlined, GroupOutlined, Home, Restore } from '@mui/icons-material';
import { useTheme } from "../../utils/themeProvider";
import PlantPanel from "./Plant/PlantPanel";
import UserPanel from "./User/UserPanel";
import SupplierPanel from "./Supplier/SupplierPanel";
// import PlantPanel from './PlantPanel/PlantPanel';
// import SupplierPanel from './SupplierPanel/SupplierPanel';
// import UserPanel from './UserPanel/UserPanel';

const AdminPanel = () => {

    const [currentWindow, setCurrentWindow] = useState(window.location.hash || '#plants');
    const { theme } = useTheme();

    const styles = {
        ulAdmin: {
            listStyleType: 'none',
            padding: 0,
            margin: 0,
        },
        liAdmin: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textDecoration: 'none',
            borderRadius: '0 20px 20px 0',
            paddingTop: '5px',
            paddingBottom: '5px',
            color: theme.palette.text.primary, // Use text color from the theme
            cursor: 'pointer',
        },
        liAdminHover: {
            backgroundColor: theme.palette.action.hover, // Use hover background color from the theme
            cursor: 'pointer',
        },
        activeDiv: {
            backgroundColor: theme.palette.action.selected, // Use selected (active) background color from the theme
        },
    };

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentWindow(window.location.hash);
        };

        const handlePopState = () => {
            setCurrentWindow(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    const handleCurrentWindow = (value) => {
        setCurrentWindow(value);
        window.location.hash = value;
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <ul style={styles.ulAdmin}>
                        <li
                            style={{
                                ...styles.liAdmin,
                                ...(currentWindow === '#plants' ? styles.activeDiv : {}),
                            }}
                            onClick={() => handleCurrentWindow('#plants')}
                        >
                            <GrassOutlined /> Розсада
                        </li>

                        <li
                            style={{
                                ...styles.liAdmin,
                                ...(currentWindow === '#users' ? styles.activeDiv : {}),
                            }}
                            onClick={() => handleCurrentWindow('#users')}
                        >
                            <GroupOutlined /> Користувачі
                        </li>
                        <li
                            style={{
                                ...styles.liAdmin,
                                ...(currentWindow === '#users' ? styles.activeDiv : {}),
                            }}
                            onClick={() => handleCurrentWindow('#suppliers')}
                        >
                            <Home /> Розсадники
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={11}>
                    {currentWindow === '#plants' && (<PlantPanel></PlantPanel>)}
                    {currentWindow === '#suppliers' && (<SupplierPanel></SupplierPanel>)}
                    {currentWindow === '#users' && (<UserPanel></UserPanel>)}
                    {/* {currentWindow === '#changelog' && (<ChangeLog />)} */}
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminPanel;