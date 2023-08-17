import React, { useEffect, useState } from "react";
import { getAllPlants, getPlantById, getPageablePlantByName } from "../../../functions/plantRequests";
import { getSupplierByid, deleteJunction, createJunction } from "../../../functions/supplierRequests";
import Modal from "../../ui/Modal/Modal";
import { Fab, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ArrowBack } from "@mui/icons-material";

const Supplier = ({ id, back }) => {
    const [supplier, setSupplier] = useState([]);
    const [active, setActive] = useState(false);
    let searchTimeout;
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);
    const [response, setResponse] = useState();
    const [keyword, setKeyword] = useState('');


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
        getSupplierByid(id).then((res) => setSupplier(res));
        getAllPlants(1, pageSize).then((res) => setResponse(res));
    }, []);

    const handleDeleteJunction = (plantId, indexToRemove) => {
        deleteJunction(id, plantId)
            .then(() => {
                const updatedPlants = supplier.avaliablePlants.slice();
                updatedPlants.splice(indexToRemove, 1);
                setSupplier((prevSupplier) => ({
                    ...prevSupplier,
                    avaliablePlants: updatedPlants,
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
        setPageNumber(1);
        handleRequest(q);
    };

    const handleRequest = (q) => {
        if (q === null)
            q = "";

        clearTimeout(searchTimeout);

        if (!isNaN(+q) && q >= 1) {
            getPlantById(q)
                .then((res) => setResponse({ data: [res] }))
                .catch((error) => {
                    setResponse([]);
                });
        }

        else if (q.length > 2) {
            searchTimeout = setTimeout(() => {
                getPageablePlantByName(q, 1, pageSize, 'id')
                    .then((res) => setResponse(res))
                    .catch((error) => {
                        setResponse([]);
                    });
            }, 800);
        }

        if (q.length === 0) {
            setPageNumber(1);
            getAllPlants(1, pageSize).then((res) => setResponse(res));
        }
    }

    const handlePageChange = (event, value) => {
        setPageNumber(value);
        if (keyword.length !== 0) {
            getPageablePlantByName(keyword, value, pageSize, 'id')
                .then((res) => setResponse(res))
                .catch((error) => {
                    setResponse([]);
                });
        } else {
            getAllPlants(value, pageSize).then((res) => setResponse(res));
        }
        console.info(response);
    };

    const handleButtonClick = (plant) => {
        createJunction(id, plant.id)
            .then(() => {
                setSupplier((prevSupplier) => ({
                    ...prevSupplier,
                    avaliablePlants: [...prevSupplier.avaliablePlants, plant],
                }));
            })
            .catch((error) => {
                console.error("Error creating junction:", error);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col text-start">
                    <h1 className="text-decoration-underline">
                        <Fab color="error" aria-label="back" size="small" onClick={() => back()} >
                            <ArrowBack />
                        </Fab>
                        {supplier?.name}
                    </h1>
                </div>
                <div className="col text-end">
                    <button className="btn btn-primary" onClick={openModal}>Добавити новий зв'язок</button>
                </div>
            </div>
            <div>

                {active && (
                    <Modal activeObj={{ active, setActive }} title={"Обрати розсаду"}>
                        <div className="admin-input">
                            <input
                                placeholder='Знайти Назва, латинь, ID'
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                {response?.data?.map((plant) => (
                                    <ListItemButton button key={plant.id} divider onClick={() => handleButtonClick(plant)}>
                                        <ListItemText primary={plant.id + ' ' + plant.latinName}> </ListItemText>
                                    </ListItemButton>
                                ))}
                            </List>
                        </div>
                        <Pagination
                            variant="outlined"
                            shape="rounded"
                            count={Math.ceil(response?.totalSize / response?.pageSize)}
                            page={pageNumber}
                            onChange={handlePageChange}
                        />
                    </Modal>
                )}


                <Paper>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">ID</StyledTableCell>
                                    <StyledTableCell align="center">Назва</StyledTableCell>
                                    <StyledTableCell align="center">Латина</StyledTableCell>
                                    <StyledTableCell align="center">Ескіз</StyledTableCell>
                                    <StyledTableCell align="center">Дії</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {supplier?.avaliablePlants?.map((plant, index) => (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row" align="center">{plant.id}</StyledTableCell>
                                        <StyledTableCell align="center">{plant.name}</StyledTableCell>
                                        <StyledTableCell align="center">{plant.latinName}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <img src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`} alt="sketch" style={{ width: '20%', height: '20%' }}></img>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <button
                                                className="btn btn-primary"
                                                onClick={x => handleDeleteJunction(plant.id, index)}
                                            > Видалити</button>
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
