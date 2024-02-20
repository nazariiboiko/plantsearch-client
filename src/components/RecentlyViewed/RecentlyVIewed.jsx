import React from 'react';
import { getRecentlyViewed } from '../../functions/RecentlyViewed.js';
import { useNavigate } from 'react-router-dom';
import { image_store } from '../../utils/constants';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './RecentlyViewed.css';
import { Paper, Typography } from '@mui/material';

const RecentlyViewedSlider = () => {
    const recentlyViewed = getRecentlyViewed();
    const navigate = useNavigate();

    const splideOptions = {
        type: 'slide',
        rewind: false,
        gap: '20px',
        perPage: 5,
        breakpoints: {
            768: {
                perPage: 3,
                arrows: false,
                gap: '5px',
            },
        },
    };

    return (
        <>
            {recentlyViewed.length !== 0 && (
                <div className="recently-viewed-slider mb-20">
                    <Typography variant="h3" color="primary" sx={{ margingTop: "8px", marginBottom: "20px" }}>
                        Недавно переглянуті
                    </Typography>
                    <Splide options={splideOptions} style={{ paddingBottom: '10px' }}>
                        {recentlyViewed.map(plant => (
                            <SplideSlide key={plant.id} onClick={() => navigate(`/plant/${plant.id}`)} style={{paddingTop:"15px"}}>
                                <div className='slide-plant-card'>
                                    <img src={`${image_store}/images/${plant.image || 'no_image.png'}`} alt={plant.name} className="slide-plant-image" />
                                    <h2 className="slide-plant-name">{plant.name}</h2>
                                    <h6 className="slide-latin-name">{plant.latinName}</h6>
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>
            )}
        </>
    );
};

export default RecentlyViewedSlider;