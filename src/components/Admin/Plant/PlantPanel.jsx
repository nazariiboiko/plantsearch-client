import { useEffect } from "react";
import * as plantRequest from "../../../functions/PlantRequest";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, tableCellClasses } from "@mui/material";
import { image_store } from "../../../utils/constants";
import AddIcon from '@mui/icons-material/Add';
import { MoreHoriz } from "@mui/icons-material";
import { useSnackbar } from "../../../context/SnackbarContext";
import './PlantPanel.css';

const PlantPanel = () => {

    let searchTimeout;
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize] = useState(20);
    const [response, setResponse] = useState();
    const [keyword, setKeyword] = useState();
    const { handleClick } = useSnackbar();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.mode === 'light' ? '#ddd' : '#505050',
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
        if (keyword == null) {
            plantRequest.getAllPlants(pageNumber, pageSize)
                .then((res) => {
                    setResponse(res);
                    setIsLoading(false);

                });
        } else {
            clearTimeout(searchTimeout);

            if (!isNaN(keyword) && keyword >= 1) {
                plantRequest.getPlantById(keyword)
                    .then((res) => setResponse({ content: [res] }))
                    .catch((error) => {
                        setResponse();
                    });
            }

            if (keyword.length > 2) {
                searchTimeout = setTimeout(() => {
                    plantRequest.findPlantByKeyword(keyword, pageNumber, pageSize, 'id')
                        .then((res) => setResponse(res))
                        .catch((error) => {
                            setResponse();
                        });
                }, 800);
            }
            if (keyword.length == 0) {
                plantRequest.getAllPlants(pageNumber, pageSize)
                    .then((res) => setResponse(res));
            }
        }
    }, [pageNumber, pageSize, keyword]);

    const handleInputChange = (e) => {
        const q = e.target.value;
        setKeyword(q);
        setPageNumber(0);
    };

    const handlePageChange = (event, value) => {
        setPageNumber(value - 1);
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="container mb-5">
            <div>
                <hr />
                <div className="d-flex justify-content-between">
                    <TextField id="outlined-basic"
                        label="Знайти назва, латинь, ID"
                        variant="outlined"
                        onChange={handleInputChange} />
                    <div class="d-flex">
                        <Pagination
                            variant="outlined"
                            shape="rounded"
                            count={Math.ceil(response?.totalElements / response?.size)}
                            page={(pageNumber + 1)}
                            onChange={handlePageChange}
                        />
                    </div>

                    <Tooltip title="Добавити" placement="top">
                        <Link to={`plant/new`} className="mr-5">
                            <Fab color="success" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Link>
                    </Tooltip>
                </div>
                <hr />
            </div>
            <Paper>
                <TableContainer>
                    <Table sx={{ width: '100%' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">ID</StyledTableCell>
                                <StyledTableCell align="center">Назва</StyledTableCell>
                                <StyledTableCell align="center">Латина</StyledTableCell>
                                <StyledTableCell align="center">Зображення</StyledTableCell>
                                <StyledTableCell align="center">Ескіз</StyledTableCell>
                                <StyledTableCell align="center" style={{ width: '200px' }}>Дії</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {response?.content?.map((plant) => (
                                <StyledTableRow key={plant.id}>
                                    <StyledTableCell component="th" scope="row" align="center">{plant.id}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {plant.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{plant.latinName}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <img
                                            src={`${image_store}/images/${plant.image || 'no_image.png'}`}
                                            alt="sketch"
                                            className="table-image"
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <img
                                            src={`${image_store}/sketches/${plant.sketch || 'no_image.png'}`}
                                            alt="sketch"
                                            style={{ width: '100px', objectFit: 'contain' }}
                                        />
                                    </StyledTableCell><StyledTableCell align="center">
                                        {/* <Link to={`plant/${plant.id}`}>
                      <Button variant="contained" className="admin-controll-button right-border">Детальніше</Button>
                    </Link> */}
                                        <Tooltip title="Детальніше" placement="right">
                                            <Fab color="primary" style={{ boxShadow: 'none' }} onClick={() => navigate(`plant/${plant.id}`)}> <MoreHoriz /> </Fab>
                                        </Tooltip>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );

}

export default PlantPanel;