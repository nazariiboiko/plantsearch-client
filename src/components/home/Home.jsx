import { Box, CircularProgress, Container, Paper, Typography } from "@mui/material"
import { useTheme } from "../../utils/themeProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPlants } from "../../functions/PlantRequest";
import { image_store } from "../../utils/constants";
import './Home.css';
import RecentlyViewedSlider from "../RecentlyViewed/RecentlyVIewed";

const Home = () => {

    const { theme } = useTheme();
    const [plants, setPlants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getRandomPlants(10)
            .then((res) => {
                setPlants([...res]);
                setIsLoading(false);
            });
    }, []);

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
                <RecentlyViewedSlider></RecentlyViewedSlider>
                <Typography variant="h3" color="primary">
                    Можливо вам сподобається
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