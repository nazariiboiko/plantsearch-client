import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../../utils/themeProvider';

const Footer = () => {
    const theme = useTheme(); // Use the useTheme hook to get the theme object
    console.log(theme);

    return (
        <Box
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
                p: 1,
            }}
        >
            <Typography variant="body1">
                &copy; {new Date().getFullYear()} PlantSearch
            </Typography>
        </Box>
    );
};

export default Footer;
