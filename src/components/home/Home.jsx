import React from 'react'
import { useEffect, useState } from 'react';
import { getRandomPlants } from '../../functions/plantRequests';
import { Link } from 'react-router-dom';
import { useAuth, getRoles, getToken } from '../../functions/authUtils';

const Home = () => {

    const [plants, setPlants] = useState([]);
    const token = getToken();

    useEffect(()  => {
    getRandomPlants(9).then((res) => setPlants([...res]));
    },[]);

    return (
        <div className='container'>
        <div className='row'>
        {   
            plants?.map((plant) => {
                return (
                    <div className="col-md-4">
                    <div className="thumbnail">
                    <Link to={`/plant/${plant.id}`}>
                        <img src={`https://plantsearch.s3.eu-north-1.amazonaws.com/images/${plant.image}`} style={{ width: '20%', height: '20%' }} alt="Lights"/>
                        <div className="caption">
                            <p>{plant.name}</p>
                        </div>
                    </Link>
                    </div>
                    </div>
            
                );
            })
        }
        <p>Hello {token}</p>
        </div>
        </div>

    )
};

export default Home