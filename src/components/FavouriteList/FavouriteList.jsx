import { useEffect, useState } from "react";
import { getFavourites } from "../../functions/favouriteRequests";
import PlantList from "../Plant/PlantList";

const FavouriteList = () => {

    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        getFavourites().then((res) => setFavourites([...res]));
    },[]);

    return (
        <div className="container">
            <PlantList response={{data:favourites}} title="Улюблені"></PlantList>
        </div>
    );
}

export default FavouriteList;