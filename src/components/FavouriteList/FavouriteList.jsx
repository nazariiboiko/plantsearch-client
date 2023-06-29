import { useEffect, useState } from "react";
import { getFavourites } from "../../functions/userRequests";
import PlantList from "../Plant/PlantList";

const FavouriteList = () => {

    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        getFavourites().then((res) => setFavourites([...res]));
    },[]);

    return (
        <div>
            <PlantList response={{data:favourites}} title="Улюблені"></PlantList>
        </div>
    );
}

export default FavouriteList;