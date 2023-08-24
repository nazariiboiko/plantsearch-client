import React from 'react'
import { useEffect, useState } from 'react';
import { getRandomPlants } from '../../functions/plantRequests';
import PlantList from '../Plant/PlantList';
import './Home.css';
import TextBlock from '../ui/TextBlock/TextBlock';
import * as text from '../../utils/text';
import { image_store } from '../../utils/constants';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [plants, setPlants] = useState([]);
    const wrapper = { data: plants };
    const navigate = useNavigate();

    useEffect(() => {
        getRandomPlants(12).then((res) => setPlants([...res]));
    }, []);

    return (
            <div className="homepage container">
                <h1 className="header">Можливо вам сподобається</h1>
                <div className="plant-list">
                    {plants.map(plant => (
                        <div key={plant.id} className="plant-card" onClick={() => navigate(`/plant/${plant.id}`)}>
                            <img src={`${image_store}/images/${plant.image}`} alt={plant.name} className="plant-image" />
                            <h2 className="plant-name">{plant.name}</h2>
                            <p className="latin-name">{plant.latinName}</p>
                        </div>
                    ))}
                </div>
            </div>
    );
};

export default Home;