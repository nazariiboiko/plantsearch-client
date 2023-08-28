import React from 'react'
import { useEffect, useState } from 'react';
import { getRandomPlants } from '../../functions/plantRequests';
import './Home.css';
import { image_store } from '../../utils/constants';
import { Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecentlyViewedList from '../RecentlyViewed/RecentlyViewed';

const Home = () => {

  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getRandomPlants(12)
      .then((res) => setPlants([...res]))
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
  }

  return (
    <div className="home-homepage container">
      <div>
        <RecentlyViewedList></RecentlyViewedList>
      </div>
      <h1 className="home-header">Можливо вам сподобається</h1>
      <div className="home-plant-list mb-20">
        {plants.map(plant => (
          <div key={plant.id} className="home-plant-card" onClick={() => navigate(`/plant/${plant.id}`)}>
            <img src={`${image_store}/images/${plant.image || 'no_image.png'}`} alt={plant.name} className="home-plant-image" />
            <h2 className="home-plant-name">{plant.name}</h2>
            <p className="home-latin-name">{plant.latinName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;