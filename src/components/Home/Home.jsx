import React from 'react'
import { useEffect, useState } from 'react';
import { getRandomPlants } from '../../functions/plantRequests';
import './Home.css';
import { image_store } from '../../utils/constants';
import { Box, CircularProgress, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecentlyViewedList from '../RecentlyViewed/RecentlyViewed';

const Home = () => {

  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isMobile = window.innerWidth <= 768; 
    const numberOfPlants = isMobile ? 9 : 10;
    getRandomPlants(numberOfPlants)
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
          height: '70%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ maxWidth: '100%' }}>
      <div>
        <RecentlyViewedList></RecentlyViewedList>
      </div>
      <h1>Можливо вам сподобається</h1>
      <div className="home-plant-list mb-20">
        {plants.map(plant => (
          <div key={plant.id} className="home-plant-card justify-content-center" onClick={() => navigate(`/plant/${plant.id}`)}>
            <img src={`${image_store}/images/${plant.image || 'no_image.png'}`} alt={plant.name} className="home-plant-image" />
            <div className='home-plant-title'>
              <h2 className="home-plant-name">{plant.name}</h2>
              <h6 className="home-latin-name">{plant.latinName}</h6>
            </div>
          </div>
        ))}
      </div>
    </Container >
  );
};

export default Home;