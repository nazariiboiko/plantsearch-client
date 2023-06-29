import React from 'react'
import { useEffect, useState } from 'react';
import { getRandomPlants } from '../../functions/plantRequests';
import PlantList from '../Plant/PlantList';
import './Home.css';
import Debug from '../Debug/Debug';
import TextBlock from '../TextBlock/TextBlock';
import * as text from '../../utils/text';

const Home = () => {

    const [plants, setPlants] = useState([]);
    const wrapper = {data : plants};

    useEffect(()  => {
    getRandomPlants(12).then((res) => setPlants([...res]));
    },[]);

    return (
        <div className='container'>
            <TextBlock text={text.informationText()} />
            <PlantList response={wrapper} title='Випадкові рослини' />
            <TextBlock text={text.advantages()} />
        </div>

    )
};

export default Home