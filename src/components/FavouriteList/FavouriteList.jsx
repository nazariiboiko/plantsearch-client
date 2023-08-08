import { useEffect, useState } from "react";
import { getFavourites } from "../../functions/favouriteRequests";
import PlantList from "../Plant/PlantList";
import { Paper } from "@mui/material";

const FavouriteList = () => {

    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        getFavourites().then((res) => setFavourites([...res]));
    },[]);

    return (
        <div className="container">
            <Paper>
            <PlantList response={{data:favourites}} title="Улюблені" showOrder={'list'}></PlantList>
            </Paper>
        </div>
    );
}

export default FavouriteList;