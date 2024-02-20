import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlantById } from "../../functions/PlantRequests";
import './Plant.css';
import { useAuth, getRole } from "../../functions/AuthUtils";

import { Check, Close, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, Checkbox, CircularProgress, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, styled } from "@mui/material";
import { image_store } from "../../utils/constants";
import { updateRecentlyViewed } from "../../functions/RecentlyViewed";
import { getFavourites, isLikedByUser, doLike } from "../../functions/FavouriteRequests";
import { findSuppliersByPlantId } from "../../functions/SupplierRequests";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ddd',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Plant = () => {

    const { id } = useParams();
    const [plant, setPlant] = useState({});
    const isAuth = useAuth();
    const [like, setLike] = useState(false);
    const [suppliers, setSuppliers] = useState(null);
    const navigate = useNavigate();

    const [availableSuppliers, setAvailableSuppliers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const rows = [
        { label: 'Висота:', value: plant.height },
        { label: 'Габітус:', value: plant.habitus },
        { label: 'Темп росту:', value: plant.growthRate },
        { label: 'Забарвлення:', value: plant.color },
        { label: 'Забарвлення (літнє):', value: plant.summerColor },
        { label: 'Забарвлення (осіннє):', value: plant.autumnColor },
        { label: 'Колір цвітіння:', value: plant.floweringColor },
        { label: 'Морозостійкість:', value: plant.frostResistance },
        { label: 'Місце для посадки:', value: plant.recommendation },
        { label: 'Освітлення:', value: plant.lighting },
        { label: 'Вічнозелене:', value: plant.evergreen },
        { label: 'Період цвітіння:', value: plant.floweringPeriod },
        { label: 'Тип сажанця:', value: plant.plantType },
        { label: 'Зонування:', value: plant.zoning },
        { label: 'Кислотність:', value: plant.ph },
        { label: 'Вологість грунту:', value: plant.soilMoisture },
        { label: 'Стійкість:', value: plant.hardy },
        { label: 'Живлення:', value: plant.nutrition },
    ];

    useEffect(() => {
        getPlantById(id)
            .then((res) => {
                setPlant(res);
                setIsLoading(false);
                updateRecentlyViewed(res);
                if (isAuth) {
                    isLikedByUser(id)
                        .then((res) => setLike(res.data));
                    if(like === null) {
                        setLike(false);
                    }
                };
            });
        findSuppliersByPlantId(id)
            .then((res) => setSuppliers(res));

    }, [id, isAuth]);

    const handleLike = () => {
        doLike(id);
        setLike(!like);
    }


    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70vh',
                }}
            >
                <CircularProgress color="inherit" />
            </Box>

        );
    }

    return (
        <Container>
            <Paper sx={{ marginTop: "20px", marginBottom: "20px", paddingTop: "8px", paddingBottom: "8px" }} elevation={3}>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h3" color="primary" style={{ flex: 1 }}>
                        {plant.name}
                    </Typography>
                    <Checkbox
                        icon={<FavoriteBorder style={{ fontSize: '45px', color: '#f25268' }} />}
                        checkedIcon={<Favorite style={{ fontSize: '45px', color: '#f25268' }} />}
                        checked={like}
                        onChange={handleLike}
                    />
                </div>
                {plant.latinName && (<Typography variant="h5">{plant.latinName}</Typography>)}
                <hr />
                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Зображення</Typography>
                        <img className="plant-image mt-5" src={`${image_store}/sketches/${plant.sketch || 'no_image.png'}`} alt="sketch"></img>
                        <img className="plant-image mt-5" src={`${image_store}/images/${plant.image || 'no_image.png'}`} alt="img" ></img>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Характеристика</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    {rows
                                        .filter((row) => row.value) // Only include rows with values
                                        .map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{row.label}</TableCell>
                                                <TableCell>{row.value}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h5">Наявність</Typography>
                        {suppliers?.content.length == 0 && (<Item>Не наявно</Item>)}
                        {suppliers?.content?.map((supplier) => (
                            <Item> {supplier.name} </Item>
                        ))}
                    </Grid>

                </Grid>

                {/* <div className="col-md-3">
                            <div className="text-center fw-bold">Наявність</div>
                            <table className="table">
                                <tbody>
                                    <tr><th></th><td></td></tr>
                                    {suppliers?.data?.map((supplier) => (
                                        <tr key={supplier.id}>
                                            <th>{supplier.name}</th>
                                            <td>
                                                {availableSuppliers.includes(supplier.id) ? (
                                                    <Check fontSize="small" />
                                                ) : (
                                                    <Close fontSize="small" />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> */}

            </Paper>
        </Container>
    );
};

export default Plant;