import { Box, CircularProgress, Container, Paper, Typography } from "@mui/material"
import { useTheme } from "../../utils/themeProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPlants } from "../../functions/PlantRequests";
import { image_store } from "../../utils/constants";
import { getRecentlyViewed } from '../../functions/RecentlyViewed.js';
import './Home.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useTranslation } from 'react-i18next';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './RecentlyViewed.css';
import './Box.css';

const Home = () => {

    const { theme } = useTheme();
    const [plants, setPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [hoveredSection, setHoveredSection] = useState(null);
    const recentlyViewed = getRecentlyViewed();

    const sections = [
        {
            id: 1,
            image: 'image1.jpg',
            text: t('findInspiration'),
            link: '/gallery',
        },
        {
            id: 2,
            image: 'image2.jpg',
            text: t('findPlants'),
            link: '/filter',
        },
        {
            id: 3,
            image: 'image3.jpg',
            text: t('findProfessional'),
            link: '/supplier',
        },
    ];

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


    useEffect(() => {
        getRandomPlants(10)
            .then((res) => {
                setPlants([...res]);
                setIsLoading(false);
            });
    }, []);


    const handleSectionHover = (sectionId) => {
        setHoveredSection(sectionId);
    };

    const handleSectionClick = (section) => {
        navigate(section.link);
    }

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70vh',
                }}
            >
                <CircularProgress color="inherit" />
            </Box>
        );
    }

    return (
        <Container>
            <Paper sx={{ marginTop: "20px", paddingTop: "8px", paddingBottom: "8px" }} elevation={3}>
                <div className="box-container">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className={`box-section ${section.id === hoveredSection ? 'hovered' : ''}`}
                            onMouseEnter={() => handleSectionHover(section.id)}
                            onMouseLeave={() => handleSectionHover(null)}
                            onClick={() => handleSectionClick(section)}
                        >
                            <div style={{ position: 'relative' }}>
                                <img src={section.image} alt={`Image ${section.id}`} />
                                <div className="overlay">
                                    <p>{section.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <>
                    {recentlyViewed.length !== 0 && (
                        <div className="recently-viewed-slider mb-20">
                            <Typography variant="h3" color="primary" sx={{ margingTop: "8px", marginBottom: "20px" }}>
                                {t('recentlyViewed')}
                            </Typography>
                            <Splide options={splideOptions} style={{ paddingBottom: '10px' }}>
                                {recentlyViewed.map(plant => (
                                    <SplideSlide key={plant.id} onClick={() => navigate(`/plant/${plant.id}`)} style={{ paddingTop: "15px" }}>
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
                <Typography variant="h3" color="primary">
                    {t('youMightLike')}
                </Typography>
                <div className="home-plant-list">
                    {plants.map(plant => (
                        <div key={plant.id} className="home-plant-card justify-content-center" onClick={() => navigate(`/plant/${plant.id}`)}>
                            <img src={`${image_store}/images/${plant.image || 'no_image.png'}`} alt={plant.name} className="home-plant-image" />
                            <div className='home-plant-tilte'>
                                <h2 className="slide-plant-name">{plant.name}</h2>
                                <h6 className="slide-latin-name">{plant.latinName}</h6>
                            </div>
                        </div>
                    ))}
                </div>

            </Paper>
        </Container>
    );
};

export default Home;