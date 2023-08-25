import { useEffect, useState } from "react";
import { getFavourites } from "../../functions/favouriteRequests";
import PlantList from "../Plant/PlantList";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import { Reorder, ViewModule } from "@mui/icons-material";

const FavouriteList = () => {

  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOrder, setShowOrder] = useState('grid');

  useEffect(() => {
    getFavourites()
      .then((res) => setFavourites([...res]))
      .finally(() => {
        setIsLoading(false);
      });;
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  };

  if (favourites.length === 0) {
    return (
      <Box sx={{ width: '100%', height: '100%' }}>
        <Typography variant="h3" style={{ textAlign: 'center' }}>
          Ви ще не добавили жодну розсаду :(
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '90%', height: '100%', marginLeft: '5%' }}>
      <Paper elevation={3}>
        <div className="d-flex justify-content-between">
          <h2 style={{margin: '10px'}}>Улюблені:</h2>
          <div style={{margin: '10px'}}>
            <Button
              disableRipple
              className={`mr-5 icon-type ${String(showOrder) === 'grid' ? 'active' : ''}`}
              onClick={() => setShowOrder('grid')}
            >
              <ViewModule fontSize="large" />
            </Button>
            <Button
              disableRipple
              className={`icon-type ${String(showOrder)  === 'list' ? 'active' : ''}`}
              onClick={() => setShowOrder('list')}
            >
              <Reorder fontSize="large" />
            </Button>
          </div>
        </div>
      </Paper>

      <PlantList response={{ data: favourites }} showOrder={showOrder}></PlantList>
    </Box>
  );
}

export default FavouriteList;