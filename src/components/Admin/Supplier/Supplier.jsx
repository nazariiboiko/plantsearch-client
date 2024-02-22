import React, { useEffect, useState } from "react";
import * as plantRequest from "../../../functions/PlantRequests";
import * as supplierRequest from "../../../functions/SupplierRequests";
import ModalTransition from "../../ui/modal/Modal";
import { Box, Button, Fab, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography, styled, tableCellClasses } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ArrowBack, Delete, RemoveRedEye } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { image_store } from "../../../utils/constants";
import { useTranslation } from "react-i18next";

const Supplier = ({ id, back }) => {
    const [supplier, setSupplier] = useState([]);
    const [active, setActive] = useState(false);
    let searchTimeout;
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize] = useState(9);
    const [response, setResponse] = useState();
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const [supplierPageNumber, setSupplierPageNumber] = useState(1);
    const [supplierPageSize, setSupplierPageSize] = useState(20);

    const handleActiveOpen = () => setActive(true);
    const handleActiveClose = () => setActive(false);

    const { t } = useTranslation();

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    useEffect(() => {
        supplierRequest.getSupplierById(id).then((res) => setSupplier(res));
        plantRequest.getAllPlants(0, pageSize).then((res) => setResponse(res));
    }, []);

    const handleDeleteJunction = (plantId, indexToRemove) => {
        supplierRequest.deleteJunction(id, plantId)
            .then(() => {
                const updatedPlants = supplier.availablePlants.content.slice();
                updatedPlants.splice(indexToRemove, 1);
                console.info(updatedPlants);
                setSupplier((prevSupplier) => ({
                    ...prevSupplier,
                    availablePlants: {
                        content: updatedPlants
                    },
                }));
            })
            .catch((error) => {
                console.error("Error deleting junction:", error);
            });
    };

    const openModal = () => {
        setActive(true);
    }

    const handleInputChange = (e) => {
        const q = e.target.value;
        setKeyword(q);
        setPageNumber(0);
        handleRequest(q);
    };

    const handleRequest = (q) => {
        if (q === null)
            q = "";

        clearTimeout(searchTimeout);

        if (!isNaN(+q) && q >= 1) {
            plantRequest.getPlantById(q)
                .then((res) => setResponse({ "content": [res] }))
                .catch((error) => {
                    setResponse();
                });
        }

        else if (q.length > 2) {
            searchTimeout = setTimeout(() => {
                plantRequest.findPlantByKeyword(q, 0, pageSize, 'id')
                    .then((res) => setResponse(res))
                    .catch((error) => {
                        setResponse();
                    });
            }, 800);
        }

        else if (q.length === 0) {
            setPageNumber(0);
            plantRequest.getAllPlants(0, pageSize).then((res) => setResponse(res));
        }
    };

    const handlePageChange = (event, value) => {
        setPageNumber(value);
        if (keyword.length !== 0) {
            plantRequest.findPlantByKeyword(keyword, value, pageSize, 'id')
                .then((res) => setResponse(res))
                .catch((error) => {
                    setResponse([]);
                });
        } else {
            plantRequest.getAllPlants(value, pageSize).then((res) => setResponse(res));
        }
    };

    const handleSupplierPageChange = (event, value) => {
        setSupplierPageNumber(value);
        supplierRequest.getSupplierById(id, value, supplierPageSize).then((res) => setSupplier(res));
    };

    const handleButtonClick = (plant) => {
        supplierRequest.addJunction(id, plant.id)
            .then(() => {
                setSupplier((prevSupplier) => ({
                    ...prevSupplier,
                    availablePlants: {
                        ...prevSupplier.availablePlants,
                        content: [...prevSupplier.availablePlants.content, plant],
                    },
                }));
            })
            .catch((error) => {
                console.error("Error creating junction:", error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <Box display="flex" justifyContent="space-between" alignItems="center" height={50}>
                    <Box display="flex" alignItems="center">
                        <Fab color="error" aria-label="back" size="small" onClick={() => back()}>
                            <ArrowBack />
                        </Fab>
                        <Typography variant="h6" sx={{ textDecoration: 'underline', ml: 1 }}>
                            {supplier?.name}
                        </Typography>
                    </Box>
                    <Pagination
                        variant="outlined"
                        shape="rounded"
                        count={Math.ceil(supplier?.availablePlants?.totalSize / supplier?.availablePlants?.pageSize)}
                        page={supplierPageNumber}
                        onChange={handleSupplierPageChange}
                    />
                    <Button onClick={openModal} variant="contained" color="primary">{t('actions.addNewJunction')}</Button>
                </Box>
            </div>
            <div>

                {active && (
                    <ModalTransition open={active} handleOpen={handleActiveOpen} handleClose={handleActiveClose} title={t('labels.choosePlant')}>
                        <div className="admin-input">
                            <input
                                placeholder={t('searchByAll')}
                                onChange={handleInputChange}
                                style={{ width: "95%", height: "100%", outline: 'none' }}
                            />
                        </div>

                        <div className="row">
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                {response?.content?.map((plant) => (
                                    <ListItemButton button key={plant.id} divider onClick={() => handleButtonClick(plant)}>
                                        <ListItemText primary={plant.id + ' ' + plant.latinName}> </ListItemText>
                                    </ListItemButton>
                                ))}
                            </List>
                        </div>
                        <Pagination
                            variant="outlined"
                            shape="rounded"
                            count={response.totalPages}
                            page={pageNumber}
                            onChange={handlePageChange}
                        />
                    </ModalTransition>
                )}


                <Paper>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">{t('plant.id')}</StyledTableCell>
                                    <StyledTableCell align="center">{t('plant.name')}</StyledTableCell>
                                    <StyledTableCell align="center">{t('plant.latinName')}</StyledTableCell>
                                    <StyledTableCell align="center">{t('plant.sketch')}</StyledTableCell>
                                    <StyledTableCell align="center">{t('actions.label')}</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {supplier?.availablePlants?.content.map((plant, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row" align="center">{plant.id}</StyledTableCell>
                                        <StyledTableCell align="center">{plant.name}</StyledTableCell>
                                        <StyledTableCell align="center">{plant.latinName}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <img src={`${image_store}/sketches/${plant.sketch || 'no_image.png'}`} alt="sketch" style={{ width: '20%', height: '20%' }}></img>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Tooltip title={t('actions.delete')} placement="top">
                                                <Fab color="error" onClick={x => handleDeleteJunction(plant.id, index)}>
                                                    <Delete />
                                                </Fab>
                                            </Tooltip>
                                            <Tooltip title={t('actions.watch')} placement="top">
                                                <Fab color="warning" onClick={() => navigate(`/plant/${plant.id}`)}>
                                                    <RemoveRedEye />
                                                </Fab>
                                            </Tooltip>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
};

export default Supplier;