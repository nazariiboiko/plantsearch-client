import { useEffect } from "react";
import { getSupplierById } from "../../functions/SupplierRequests";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import PlantList from "../Plant/PlantList";
import { Reorder, ViewModule } from "@mui/icons-material";

const Supplier = () => {

    const { id } = useParams();
    const [supplier, setSupplier] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showOrder, setShowOrder] = useState('grid');

    useEffect(() => {
        getSupplierById(id)
            .then((res) => {
                setSupplier(res);
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
        <Box sx={{ width: '90%', height: '100%', marginLeft: '5%', marginTop: '1%' }}>
            <Paper elevation={3}>
                <div className="d-flex justify-content-between">
                    <h2 style={{ margin: '10px' }}>{supplier.name}</h2>
                    <div style={{ margin: '10px' }}>
                        <Button
                            disableRipple
                            className={`mr-5 icon-type ${String(showOrder) === 'grid' ? 'active' : ''}`}
                            onClick={() => setShowOrder('grid')}
                        >
                            <ViewModule fontSize="large" />
                        </Button>
                        <Button
                            disableRipple
                            className={`icon-type ${String(showOrder) === 'list' ? 'active' : ''}`}
                            onClick={() => setShowOrder('list')}
                        >
                            <Reorder fontSize="large" />
                        </Button>
                    </div>
                </div>
            </Paper>

            <PlantList response={ supplier.availablePlants } showOrder={showOrder}></PlantList>
            {supplier.avaliablePlants?.content.length === 0 && (
                <Box sx={{ width: '100%', height: '100%' }}>
                    <Typography variant="h3" style={{ textAlign: 'center' }}>
                        Наразі тут немає жодної розсади.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Supplier;