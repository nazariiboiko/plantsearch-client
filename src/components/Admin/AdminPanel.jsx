import React, { useState } from 'react';
import './Admin.css';
import { Box, Grid } from '@mui/material';
import { ApartmentOutlined, GrassOutlined, GroupOutlined } from '@mui/icons-material';
import PlantPanel from './PlantPanel/PlantPanel';
import SupplierPanel from './SupplierPanel/SupplierPanel';
import UserPanel from './UserPanel/UserPanel';


const AdminPanel = () => {

    const [currentWindow, setCurrentWindow] = useState('1');

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <ul className='ul-admin'>
                        <li
                            className={`li-admin ${currentWindow === '1' ? 'active-div' : ''}`}
                            onClick={() => setCurrentWindow('1')}
                        >
                            <GrassOutlined /> Розсада
                        </li>
                        <li
                            className={`li-admin ${currentWindow === '2' ? 'active-div' : ''}`}
                            onClick={() => setCurrentWindow('2')}
                        >
                            <ApartmentOutlined /> Розсадники
                        </li>
                        <li
                            className={`li-admin ${currentWindow === '3' ? 'active-div' : ''}`}
                            onClick={() => setCurrentWindow('3')}
                        >
                            <GroupOutlined /> Користувачі
                        </li>
                    </ul>
                </Grid>
                <Grid item xs={10}>
                    {currentWindow === '1' && (<PlantPanel></PlantPanel>)}
                    {currentWindow === '2' && (<SupplierPanel></SupplierPanel>)}
                    {currentWindow === '3' && (<UserPanel></UserPanel>)}
                </Grid>
            </Grid>
        </Box>
    );
}

export default AdminPanel;