import { useEffect } from "react";
import * as request from "../../../functions/supplierRequests";
import { useState } from "react";
import './SupplierPanel.css';
import { Alert, CircularProgress, Fab, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, styled, tableCellClasses } from "@mui/material";
import Supplier from "./Supplier";
import { Add, Check, Save } from "@mui/icons-material";
import Modal from "../../ui/Modal/Modal";
import { green } from "@mui/material/colors";

const SupplierPanel = () => {

  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  //Modal
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [supplierName, setSupplierName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    request.getAllSuppliers(pageNumber, pageSize).then((res) => setSuppliers(res));
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

  const handleDetailsClick = (id) => {
    setSelectedSupplierId(id);
  };

  const handleBackClick = () => {
    setSelectedSupplierId(null);
  };

  const handleDelete = () => {
    const confirmed = window.confirm('Ви впевнені що хочете видалити?');
    if (confirmed) {
      request.deleteSupplier(selectedSupplierId)
        .then(() => {
          const updatedData = suppliers.data.filter(sup => String(sup.id) !== String(selectedSupplierId))
          setSuppliers((prevSuppliers) => ({
            ...prevSuppliers,
            data: updatedData,
          }));
        });
      handleBackClick();
    }
  }

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
      return <Supplier id={selectedSupplierId} back={handleBackClick} deleteSup={handleDelete} />
    }
    return null;
  };

  return (
    <div className="container">
      {selectedSupplierId === null && (
        <Paper>
          <div>
            <hr />
            <div className="d-flex justify-content-between">
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
              <Tooltip title="Добавити" placement="top" className="mr-5">
                <Fab color="success" aria-label="add" onClick={handleCreateButton}>
                  <Add />
                </Fab>
              </Tooltip>
              {showCreateModal && (
                <Modal activeObj={{ active: showCreateModal, setActive: setShowCreateModal }} title={"Створити розсадника"}>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6} md={8}>
                      <TextField id="outlined-basic" label="Назва розсадника" variant="outlined" onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={6}>
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
                      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
                    </Grid>
                  </Grid>
                </Modal>
              )}
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
                {suppliers?.data?.map((supplier) => (
                  <StyledTableRow key={supplier.id}>
                    <StyledTableCell component="th" scope="row" align="center">{supplier.id}</StyledTableCell>
                    <StyledTableCell align="center">{supplier.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleDetailsClick(supplier.id)}
                      >
                        Детальніше
                      </button>
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