import { useEffect, useState } from "react";
import './Admin.css';
import { Box, Grid } from '@mui/material';
import { ApartmentOutlined, ChangeHistory, GrassOutlined, GroupOutlined, History, Home, Restore } from '@mui/icons-material';
import { useTheme } from "../../utils/themeProvider";
import PlantPanel from "./Plant/PlantPanel";
import UserPanel from "./User/UserPanel";
import SupplierPanel from "./Supplier/SupplierPanel";
import ChangeLog from "../ChangeLog/ChangeLog";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import Marker from "./Gallery/MarkerPanel";
import { useTranslation } from "react-i18next";

const AdminPanel = () => {

    const [currentWindow, setCurrentWindow] = useState(window.location.hash || '#plants');
    const { theme } = useTheme();
    const { t } = useTranslation();

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
            color: theme.palette.text.primary, 
            cursor: 'pointer',
        },
        liAdminHover: {
            backgroundColor: theme.palette.action.hover, 
            cursor: 'pointer',
        },
        activeDiv: {
            backgroundColor: theme.palette.action.selected,
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
                            <GrassOutlined /> {t('plants')}
                        </li>

                        <li
                            style={{
                                ...styles.liAdmin,
                                ...(currentWindow === '#users' ? styles.activeDiv : {}),
                            }}
                            onClick={() => handleCurrentWindow('#users')}
                        >
                            <GroupOutlined /> {t('users')}
                        </li>
                        <li
                            style={{
                                ...styles.liAdmin,
                                ...(currentWindow === '#suppliers' ? styles.activeDiv : {}),
                            }}
                            onClick={() => handleCurrentWindow('#suppliers')}
                        >
                            <Home /> {t('suppliers')}
                        </li>
                        <li
                            style={{
                                ...styles.liAdmin,
                                ...(currentWindow === '#gallery' ? styles.activeDiv : {}),
                            }}
                            onClick={() => handleCurrentWindow('#gallery')}>
                            <ImageSearchIcon /> {t('gallery')}
                        </li>
                        <li
                            style={{
                                ...styles.liAdmin,
                                ...(currentWindow === '#changelog' ? styles.activeDiv : {}),
                            }}
                            onClick={() => handleCurrentWindow('#changelog')}
                        >
                            <History /> {t('changelog')}
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={11}>
                    {currentWindow === '#plants' && (<PlantPanel></PlantPanel>)}
                    {currentWindow === '#suppliers' && (<SupplierPanel></SupplierPanel>)}
                    {currentWindow === '#users' && (<UserPanel></UserPanel>)}
                    {currentWindow === '#gallery' && (<Marker />)}
                    {currentWindow === '#changelog' && (<ChangeLog />)}
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminPanel;