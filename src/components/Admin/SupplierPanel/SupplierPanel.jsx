import { useEffect } from "react";
import * as request from "../../../functions/supplierRequests";
import { useState } from "react";
import './SupplierPanel.css';
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, styled, tableCellClasses } from "@mui/material";
import Supplier from "./Supplier";
import { Add, Create } from "@mui/icons-material";
import { Link } from "react-router-dom";

const UserPanel = () => {

  const [suppliers, setSuppliers] = useState();
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

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
    request.getAllSuppliers().then((res) => setSuppliers(res))
  }, []);

  const handleDetailsClick = (id) => {
    setSelectedSupplierId(id);
  };

  const handleBackClick = () => {
    setSelectedSupplierId(null);
  };

  const renderDetailsComponent = () => {
    if (selectedSupplierId) {
      return <Supplier id={selectedSupplierId} back={handleBackClick} />
    }
    return null;
  };

  return (
    <div>
      {selectedSupplierId === null && (
        <Paper>
          {/* <hr />
          <div className="d-flex justify-content-end mb-10">
            <Tooltip title="Добавити" placement="top">
              <Link to={`supplier/-1`} className="mr-5">
                <Fab color="success" aria-label="add">
                  <Add />
                </Fab>
              </Link>
            </Tooltip>
          </div>
          <hr /> */}
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

export default UserPanel;