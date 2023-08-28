import React from 'react';
import { getRecentlyViewed } from '../../functions/recentlyViewed';
import { useNavigate } from 'react-router-dom';
import { image_store } from '../../utils/constants';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './RecentlyViewed.css';

const RecentlyViewedSlider = () => {
    const recentlyViewed = getRecentlyViewed();
    const navigate = useNavigate();

    return (
        <div className="recently-viewed-slider">
            <h1 className="slide-header">Недавно переглянуті</h1>
            <div className='slide-plant-list'>
                <Splide options={{ perPage: 3, gap: '20px', rewind: false }}>
                    {recentlyViewed.map(plant => (
                        <SplideSlide key={plant.id} className="slide-plant-card" onClick={() => navigate(`/plant/${plant.id}`)}>
                            <img src={`${image_store}/images/${plant.image || 'no_image.png'}`} alt={plant.name} className="slide-plant-image" />
                            <h2 className="slide-plant-name">{plant.name}</h2>
                            <p className="slide-latin-name">{plant.latinName}</p>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
};

export default RecentlyViewedSlider;
