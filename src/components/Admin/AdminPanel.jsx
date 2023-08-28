import React, { useState } from 'react';
import './Admin.css';
import { Badge, Box, Grid } from '@mui/material';
import { ApartmentOutlined, GrassOutlined, GroupOutlined, Restore } from '@mui/icons-material';
import PlantPanel from './PlantPanel/PlantPanel';
import SupplierPanel from './SupplierPanel/SupplierPanel';
import UserPanel from './UserPanel/UserPanel';
import { useEffect } from 'react';
import ChangeLog from '../ChangeLog/ChangeLog';
import { getUpdateNumber } from '../../utils/changelog';


const AdminPanel = () => {

    const [currentWindow, setCurrentWindow] = useState(window.location.hash || '#plants');
    const updateNumber = getUpdateNumber();
    const badgeClicked = localStorage.getItem('badgeClicked');

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

    const handleBadgeClick = () => {
        localStorage.setItem('badgeClicked', String(updateNumber));
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <ul className='ul-admin'>
                        <li
                            className={`li-admin ${currentWindow === '#plants' ? 'active-div' : ''}`}
                            onClick={() => handleCurrentWindow('#plants')}
                        >
                            <GrassOutlined /> Розсада
                        </li>
                        <li
                            className={`li-admin ${currentWindow === '#suppliers' ? 'active-div' : ''}`}
                            onClick={() => handleCurrentWindow('#suppliers')}
                        >
                            <ApartmentOutlined /> Розсадники
                        </li>
                        <li
                            className={`li-admin ${currentWindow === '#users' ? 'active-div' : ''}`}
                            onClick={() => handleCurrentWindow('#users')}
                        >
                            <GroupOutlined /> Користувачі
                        </li>
                        <li
                            className={`li-admin ${currentWindow === '#changelog' ? 'active-div' : ''}`}
                            onClick={() => { handleCurrentWindow('#changelog'); handleBadgeClick() }}
                        >
                            <Restore />
                            {String(badgeClicked) === String(updateNumber) ?
                                ('Список змін') :
                                (
                                    <>Список змін <div className="badge badge-green">new</div></>
                                )}
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={10}>
                    {currentWindow === '#plants' && (<PlantPanel></PlantPanel>)}
                    {currentWindow === '#suppliers' && (<SupplierPanel></SupplierPanel>)}
                    {currentWindow === '#users' && (<UserPanel></UserPanel>)}
                    {currentWindow === '#changelog' && (<ChangeLog />)}
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminPanel;