import { useEffect } from "react";
import * as request from "../../../functions/SupplierRequests";
import { useState } from "react";
import './SupplierPanel.css';
import { Alert, Box, Button, CircularProgress, Fab, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, styled, tableCellClasses } from "@mui/material";
// import Supplier from "./Supplier";
import { Add, Check, Save } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import ModalTransition from "../../ui/modal/Modal";
import Supplier from "./Supplier";

const SupplierPanel = () => {

    const [response, setResponse] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplierId, setSelectedSupplierId] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [isLoading, setIsLoading] = useState(false);

    //Modal
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [supplierName, setSupplierName] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleCreateModalOpen = () => setShowCreateModal(true);
    const handleCreateModalClose = () => setShowCreateModal(false);

    useEffect(() => {
        request.getAllSuppliers(pageNumber, pageSize)
            .then((res) => {
                setSuppliers(res);
                setResponse(res);
                // console.info(res);
                setIsLoading(false);
            });
    }, []);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

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

    const handleDetailsClick = (id) => {
        setSelectedSupplierId(id);
    };

    const handleBackClick = () => {
        setSelectedSupplierId(null);
    };

    const handleInputChange = (obj) => {
        setSupplierName(obj.target.value);
    }

    const handleCreateButton = () => {
        setShowCreateModal(!showCreateModal);
    };

    const handleCreateClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            request.createSupplier(supplierName)
                .then(() => {
                    setSuccess(true);
                    setLoading(false);
                    setErrorMsg('');
                    request.getAllSuppliers().then((res) => {
                        setSuppliers(res);
                        setTimeout(() => {
                            setLoading(false);
                            setSuccess(false);
                        }, 2000);
                    });
                })
                .catch((error) => {
                    setErrorMsg(error.response.data)
                    setSuccess(false);
                    setLoading(false);
                });
        }
    };

    const handlePageChange = (event, value) => {
        setPageNumber(value);
        request.getAllSuppliers(value, pageSize).then((res) => setSuppliers(res));
    };

    const renderDetailsComponent = () => {
        if (selectedSupplierId) {
            return <Supplier id={selectedSupplierId} back={handleBackClick} />
        }
        return null;
    };

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
        <div className="container">
            {selectedSupplierId === null && (
                <Paper>
                    <div>
                        <hr />
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                            <div></div>
                            <div class="d-flex">
                                <Pagination
                                    variant="outlined"
                                    shape="rounded"
                                    count={Math.ceil(suppliers?.totalSize / suppliers?.pageSize)}
                                    page={pageNumber}
                                    onChange={handlePageChange}
                                />
                            </div>
                            <div>
                                <Tooltip title="Добавити" placement="top" className="mr-5">
                                    <Fab color="success" aria-label="add" onClick={handleCreateButton}>
                                        <Add />
                                    </Fab>
                                </Tooltip>
                                <ModalTransition open={showCreateModal} handleOpen={handleCreateModalOpen} handleClose={handleCreateModalClose} title={'Створити'}>
                                    <Grid container rowSpacing={1}>
                                        <Grid item xs={1}></Grid>
                                        <Grid item xs={5} md={5}>
                                            <TextField id="outlined-basic" label="Назва розсадника" variant="outlined" onChange={handleInputChange} />
                                        </Grid>
                                        <Grid item xs={3}></Grid>
                                        <Grid item xs={1}>
                                            <Fab
                                                aria-label="save"
                                                color="primary"
                                                sx={buttonSx}
                                                onClick={handleCreateClick}
                                            >
                                                {success ? <Check /> : <Save />}
                                            </Fab>
                                            {loading && (
                                                <CircularProgress
                                                    size={68}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 74,
                                                        left: 10,
                                                        color: green[500],
                                                    }}
                                                />
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {errorMsg && <Alert severity="error">{JSON.stringify(errorMsg)}</Alert>}</Grid>
                                    </Grid>
                                </ModalTransition>
                            </div>
                        </div>
                        <hr />


                    </div>
                    <TableContainer>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">ID</StyledTableCell>
                                    <StyledTableCell align="center">Назва</StyledTableCell>
                                    <StyledTableCell align="center">Дії</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {suppliers?.content?.map((supplier) => (
                                    <StyledTableRow key={supplier.id}>
                                        <StyledTableCell component="th" scope="row" align="center">{supplier.id}</StyledTableCell>
                                        <StyledTableCell align="center">{supplier.name}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="inherit"
                                                onClick={() => handleDetailsClick(supplier.id)}
                                            >
                                                Детальніше
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>)
            }
            {renderDetailsComponent()}
        </div>
    );
}

export default SupplierPanel;