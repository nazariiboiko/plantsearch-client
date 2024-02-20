import { useEffect, useRef, useState } from "react";
import * as request from "../../../functions/PlantMarkersRequest.js";
import * as plantRequest from "../../../functions/PlantRequests";
import { Alert, Autocomplete, Box, Button, CircularProgress, Fab, Grid, List, ListItemButton, ListItemText, MenuItem, Pagination, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, tableCellClasses } from "@mui/material";
import { Add, Delete, Save, Update } from "@mui/icons-material";
import ModalTransition from "../../ui/modal/Modal.jsx";
import { green } from "@mui/material/colors";
import styled from "@emotion/styled";
import { image_store } from "../../../utils/constants.js";
import { Link } from "react-router-dom";
import { useSnackbar } from "../../../context/SnackbarContext.jsx";

const Marker = () => {

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [groups, setGroups] = useState([]);
    const svgRef = useRef(null);
    const { handleClick } = useSnackbar();

    const [showCreateModal, setCreateModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [group, setGroup] = useState({ markers: [] });
    const [selectedImage, setSelectedImage] = useState(null);
    const [plants, setPlants] = useState();
    let searchTimeout;

    //Choose plant
    const [active, setActive] = useState(false);
    const handleActiveOpen = () => setActive(true);
    const handleActiveClose = () => setActive(false);
    const [keyword, setKeyword] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const handleOpenSelectPlant = (index) => {
        setSelectedGroup(index);
        handleActiveOpen();
    }

    useEffect(() => {
        handleGetGroups();
    }, [pageNumber, pageSize]);

    const handleGetGroups = () => {
        request.getAllGroups(pageNumber, pageSize)
            .then((res) => {
                setGroups(res);
                console.info(res);
                setIsLoading(false);
            });
        plantRequest.getAllPlants(0, pageSize).then((res) => setPlants(res));
    }

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

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        width: "100%",
        color: theme.palette.text.secondary,
    }));

    const handleImageChange = (file) => {
        setSelectedImage(file);
        handleChange({ target: { name: 'src', value: file.name } })
    };

    const handleChange = ({ target: { name, value } }) => {
        setGroup((prevGroup) => ({
            ...prevGroup,
            "id": group.id || -1,
            [name]: value,
        }));
    };

    const handleImageClick = (event) => {
        const svgRect = svgRef.current.getBoundingClientRect();
        const svgX = Math.round(event.clientX - svgRect.left);
        const svgY = Math.round(event.clientY - svgRect.top);

        const newMarker = {
            plantName: "",
            plantId: 1,
            positionTop: svgY,
            positionLeft: svgX,
        };

        setGroup((prevGroup) => ({
            ...prevGroup,
            markers: [...prevGroup.markers, newMarker]
        }));
    };

    const handleRemoveMarker = (indexToRemove) => {
        setGroup((prevGroup) => ({
            ...prevGroup,
            markers: prevGroup.markers.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handlePageChange = (event, value) => {
        setPageNumber(value - 1);
    };

    const handleShowSelectedGroup = (selectedGroup) => {
        request.getGroupById(selectedGroup.id)
            .then((res) => {
                setGroup(res);
            });
        setCreateModal(true);
    }

    const handleCreateClick = () => setCreateModal(true);
    const handleCreateModalClose = () => {
        setCreateModal(false);
        setGroup({ markers: [] });
        setSelectedImage(null);
    }

    const handleRequest = (q) => {
        if (q === null)
            q = "";

        clearTimeout(searchTimeout);

        if (!isNaN(+q) && q >= 1) {
            plantRequest.getPlantById(q)
                .then((res) => setPlants({ "content": [res] }))
                .catch((error) => {
                    setPlants();
                });
        }

        else if (q.length > 2) {
            searchTimeout = setTimeout(() => {
                plantRequest.findPlantByKeyword(q, 0, pageSize, 'id')
                    .then((res) => setPlants(res))
                    .catch((error) => {
                        setPlants();
                    });
            }, 800);
        }

        else if (q.length === 0) {
            setPageNumber(0);
            plantRequest.getAllPlants(0, pageSize).then((res) => setPlants(res));
        }
    };

    const handlePlantSelect = (plant) => {
        if (selectedGroup != null) {
            const index = selectedGroup;

            if (plant?.id != null) {
                setGroup((prevGroup) => ({
                    ...prevGroup,
                    markers: prevGroup.markers.map((marker, i) => {
                        if (i === index) {
                            return {
                                ...marker,
                                plantId: plant?.id,
                                plantName: plant?.name // or whichever property holds the name of the plant
                            };
                        }
                        return marker;
                    })
                }));
            }
        }
        console.info(group);
    };

    const handleSaveMarker = () => {
        if (group.id == null || group?.id == -1) {
            request.saveGroup(group, selectedImage)
                .then(() => setCreateModal(false));
            handleClick('success', 'Успішно створено!');
        } else {
            request.updateGroup(group, selectedImage)
                .then(() => setCreateModal(false));
            handleClick('success', 'Успішно обновлено!');
        };
        handleGetGroups();

    }

    const handleCreateModalOpen = () => {

    };

    const handleInputChange = (e) => {
        const q = e.target.value;
        setKeyword(q);
        setPageNumber(0);
        handleRequest(q);
    };

    const handleDeleteGroup = (id) => {
        request.deleteGroup(id)
            .then(() => handleGetGroups())
            .catch((error) => {
                handleClick('error', error.message);
            });
        handleGetGroups();
    }


    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '70%',
                }}
            >
                <CircularProgress />
            </Box>
        );
    };

    return (
        <Paper>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                <div></div>
                <div class="d-flex">
                    <Pagination
                        variant="outlined"
                        shape="rounded"
                        count={Math.ceil(groups?.totalElements / groups?.size)}
                        page={(pageNumber + 1)}
                        onChange={handlePageChange}
                    />
                </div>
                <div>
                    <Tooltip title="Добавити" placement="top" className="mr-5">
                        <Fab color="success" aria-label="add" onClick={handleCreateClick}>
                            <Add />
                        </Fab>
                        {/* </Link> */}
                    </Tooltip>
                    <ModalTransition open={showCreateModal} handleOpen={handleCreateModalOpen} handleClose={handleCreateModalClose} title={'Створити маркування'} width={800}>
                        <Grid container spacing={0}>
                            <Grid item xs={6}>

                                <div style={{ marginLeft: "1%" }}>
                                    <svg ref={svgRef} width={400} height={400} onClick={handleImageClick}>

                                        {selectedImage && (
                                            <image href={URL.createObjectURL(selectedImage)} alt="Selected Image" height={400} />
                                        )}
                                        {group.id != -1 && (
                                            <image href={`${image_store}/markers/${group.src}`} alt="Selected Image" height={400} />
                                        )}
                                        {group.src && (group.markers?.map((marker, index) => (
                                            <g key={index}>
                                                <circle cx={marker.positionLeft} cy={marker.positionTop} r={15} stroke="black" strokeWidth={0} fill="white" />
                                                <text x={marker.positionLeft} y={marker.positionTop} textAnchor="middle" dominantBaseline="central" fill="black">{index + 1}</text>
                                            </g>
                                        )))}

                                    </svg>
                                    <input
                                        type="file"
                                        required
                                        onChange={(e) => handleImageChange(e.target.files[0])}
                                    />
                                </div>
                            </Grid>

                            <Grid item xs={6}>
                                <Box sx={{ maxHeight: '40vh', overflowY: 'auto', paddingRight: '1rem' }}>
                                    <Stack>
                                        {group.markers?.map((marker, index) => (
                                            <Item key={index}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography>{index + 1}.</Typography>
                                                    <Typography>{marker.plantName}</Typography>
                                                    <Button
                                                        onClick={() => handleOpenSelectPlant(index)}
                                                        variant="contained"
                                                    >Обрати розсаду</Button>
                                                    <Fab
                                                        color="secondary"
                                                        size="small"
                                                        onClick={() => handleRemoveMarker(index)}
                                                        style={{ marginLeft: "8px" }}
                                                    >
                                                        <Delete />
                                                    </Fab>
                                                </Box>
                                            </Item>
                                        ))}
                                    </Stack>
                                    {group?.id === -1 ? (
                                        <Fab color="success" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
                                            onClick={handleSaveMarker}>
                                            <Save />
                                        </Fab>) : (
                                        <Fab color="success" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
                                            onClick={handleSaveMarker}>
                                            <Update />
                                        </Fab>
                                    )}
                                </Box>
                            </Grid>


                        </Grid>
                    </ModalTransition>
                    <ModalTransition open={active} handleOpen={handleActiveOpen} handleClose={handleActiveClose} title={'Обрати розсаду'}>
                        <div className="admin-input">
                            <input
                                placeholder='Знайти Назва, латинь, ID'
                                onChange={handleInputChange}
                                style={{ width: "95%", height: "100%", outline: 'none' }}
                            />
                        </div>

                        <div className="row">
                            <List sx={style} component="nav" aria-label="mailbox folders">
                                {plants?.content?.map((plant) => (
                                    <ListItemButton button key={plant.id} divider onClick={() => handlePlantSelect(plant)}>
                                        <ListItemText primary={plant.id + ' ' + plant.latinName}> </ListItemText>
                                    </ListItemButton>
                                ))}
                            </List>
                        </div>
                        <Pagination
                            variant="outlined"
                            shape="rounded"
                            count={plants?.totalPages}
                            page={pageNumber}
                            onChange={handlePageChange}
                        />
                    </ModalTransition>
                </div>
            </div>
            <hr />

            <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">ID</StyledTableCell>
                            <StyledTableCell align="center">Фото</StyledTableCell>
                            <StyledTableCell align="center">Дії</StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups?.content?.map((group, index) => (
                            <StyledTableRow key={group.id}>
                                <StyledTableCell component="th" scope="row" align="center">{group.id}</StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="center">
                                    <img
                                        src={`${image_store}/markers/${group.src || 'no_image.png'}`}
                                        alt="sketch"
                                        className="table-image"
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="inherit"
                                        onClick={() => handleShowSelectedGroup(group)}
                                    >
                                        Детальніше
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Tooltip title="Delete">
                                        <Fab
                                            color="secondary"
                                            onClick={() => handleDeleteGroup(group.id)}
                                        >
                                            <Delete />
                                        </Fab>
                                    </Tooltip>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper >
    );
}

export default Marker;