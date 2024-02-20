import { Box, Container, Grid, ImageList, ImageListItem, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';
import ModalTransition from '../ui/modal/Modal';
import { image_store } from '../../utils/constants';
import styled from '@emotion/styled';
import * as groupRequest from "../../functions/PlantMarkersRequest";
import { Link } from 'react-router-dom';

const PlantMarkers = () => {

  const [groups, setGroups] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    groupRequest.getAllGroups()
      .then((res) => setGroups(res));
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    width: "100%",
    color: theme.palette.text.secondary,
    cursor: 'pointer', // Add cursor pointer for clickable behavior
    transition: 'background-color 0.3s ease', // Smooth transition on hover
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? '#222' : '#f5f5f5', // Darken background on hover
    },
  }));

  const handlePlantClick = (plant) => {
    handleOpen();
    groupRequest.getGroupById(plant.id)
      .then((res) => setSelectedPlant(res));
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <Container>
      <Paper sx={{ marginTop: "20px", paddingTop: "8px", paddingBottom: "8px" }} elevation={3}>
        <Typography variant="h4" color="primary">
          Шукаю натхнення
        </Typography>

        <Box sx={{ width: "90%", marginLeft: "5%", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 2fr))", gridGap: "10px", maxHeight: '100vh', overflowY: 'auto', paddingRight: '1rem' }}>
          {groups?.content.map((item) => (
            <img
              key={item.src}
              src={`${image_store}/markers/${item.src}`}
              alt={item.plantName}
              loading="lazy"
              onClick={() => handlePlantClick(item)}
              sx={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          ))}
        </Box>

        <div>
          {selectedPlant != null && (
            <ModalTransition open={isModalOpen} handleOpen={handleOpen} handleClose={handleClose} title={'Перелік рослин'} width={800}>
              <Grid container spacing={0}>

                <Grid item xs={5}>
                  <div style={{ marginLeft: "1%" }}>
                    <svg width={400} height={400}>
                      <image href={`${image_store}/markers/${selectedPlant.src}`} alt={selectedPlant.name} height={400} />
                      {selectedPlant.markers?.map((element, index) => (
                        <g key={index}>
                          <Link to={`/plant/${element.id}`}>
                          <circle cx={element.positionLeft} cy={element.positionTop} r={15} stroke="black" strokeWidth={0} fill="white" />
                          <text x={element.positionLeft} y={element.positionTop} textAnchor="middle" dominantBaseline="central" fill="black">{index + 1}</text>
                          </Link>
                        </g>
                        
                      ))}
                    </svg>
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <Stack>
                    {selectedPlant.markers?.map((element, index) => (
                      <Link to={`/plant/${element.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Item key={index} >
                          <Typography variant="body1">
                            {index + 1 + ' ' + element.plantName}
                          </Typography>
                        </Item>
                      </Link>
                    ))}
                  </Stack>
                </Grid>


              </Grid>

            </ModalTransition>
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default PlantMarkers;
