import { useEffect, useState } from "react";
import { getFavourites } from "../../functions/favouriteRequests";
import PlantList from "../Plant/PlantList";
import { Box, Paper, Typography } from "@mui/material";

const FavouriteList = () => {

    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        getFavourites().then((res) => setFavourites([...res]));
    }, []);

    if (favourites.length === 0) {
        return (
            <Box sx={{ width: '100%', height: '100%' }}>
                <Typography variant="h3" style={{ textAlign: 'center' }}>
                    Ви ще не добавили жодну розсаду :(
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '90%', height: '100%', marginLeft: '5%'}}>
            <PlantList response={{ data: favourites }} title="Улюблені" showOrder={'list'}></PlantList>
        </Box>
    );
}

export default FavouriteList;