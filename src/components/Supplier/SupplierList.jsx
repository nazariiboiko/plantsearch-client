import { useState, useEffect } from "react";
import * as request from "../../functions/SupplierRequests";
import './SupplierList.css';
import { ApartmentOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Container, Paper } from "@mui/material";
import { useTheme } from "../../utils/themeProvider";
import { useTranslation } from 'react-i18next';


const SupplierList = () => {

    const [suppliers, setSuppliers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { theme } = useTheme();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const SupplierStyles = {
        searchBarBody: {
            marginLeft: '10px',
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#101010',
            borderRadius: '20px',
            width: '300px',
            position: 'relative',
            zIndex: 999,
        },
        supplierCard: {
            border: `1px ${theme.palette.mode === 'light' ? 'black' : '#fff'} solid`,
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#333',
            padding: "20px",
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease -in -out',
            
        }
    };

    useEffect(() => {
        request.getAllSuppliers()
            .then((res) => setSuppliers(res))
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70%',
                }}
            >
                <CircularProgress />
            </Box>
        );
    };

    return (
        <Container>
            <Paper sx={{ padding: 2, marginTop: "15px" }} elevation={3}>
                <div className="filter-header">
                    <h4 className="w-100 font-weight-bold filter-title d-flex"><ApartmentOutlined /> {t('suppliers')}</h4>
                    <hr />
                </div>
                <div className="supplier-list">
                    {suppliers?.content?.map((supplier) => (
                        <div key={supplier.id} style={SupplierStyles.supplierCard} className="supplier-card-animate" onClick={() => navigate(`${supplier.id}`)}>
                            <h5 className="home-plant-name">{supplier.name}</h5>
                            <p className="supplier-details">{supplier.details}</p>
                        </div>
                    ))}
                </div>
            </Paper>
        </Container>
    );
};

export default SupplierList;