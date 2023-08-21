import { useEffect } from "react";
import { getAllPlants, getPlantById, getPageablePlantByName } from "../../../functions/plantRequests";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import { Button, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, tableCellClasses } from "@mui/material";
import { image_store } from "../../../utils/constants";
import AddIcon from '@mui/icons-material/Add';

const PlantPanel = ({ onInputChange }) => {

  let searchTimeout;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(50);
  const [response, setResponse] = useState();
  const [keyword, setKeyword] = useState('');

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
    getAllPlants(pageNumber, pageSize).then((res) => setResponse(res));
  }, [pageNumber, pageSize]);

  const handleInputChange = (e) => {
    const q = e.target.value;
    setKeyword(q);
    setPageNumber(1);
    handleRequest(q);
  };

  const handleRequest = (q) => {
    if (q === null)
      q = '';

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
        getPageablePlantByName(q, 1, 5, 'id')
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
      getPageablePlantByName(keyword, value, 5, 'id')
        .then((res) => setResponse(res))
        .catch((error) => {
          setResponse([]);
        });
    } else {
      getAllPlants(value, pageSize).then((res) => setResponse(res));
    }
  };

  return (
    <div className="container">
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
              count={Math.ceil(response?.totalSize / response?.pageSize)}
              page={pageNumber}
              onChange={handlePageChange}
            />
          </div>

          <Tooltip title="Добавити" placement="top">
            <Link to={`plant/-1`} className="mr-5">
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
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Назва</StyledTableCell>
                <StyledTableCell align="center">Латина</StyledTableCell>
                <StyledTableCell align="center">Тип</StyledTableCell>
                <StyledTableCell align="center">Ескіз</StyledTableCell>
                <StyledTableCell align="center">Дії</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {response?.data?.map((plant) => (
                <StyledTableRow key={plant.id}>
                  <StyledTableCell component="th" scope="row" align="center">{plant.id}</StyledTableCell>
                  <StyledTableCell align="center">
                    {plant.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{plant.latinName}</StyledTableCell>
                  <StyledTableCell align="center">{plant.plantType}</StyledTableCell>
                  <StyledTableCell align="center"><img src={`${image_store}/sketches/${plant.sketch}`} alt="sketch" style={{ width: '100px', height: '100px' }}></img></StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`plant/${plant.id}`}>
                      <Button variant="contained" className="admin-controll-button right-border">Детальніше</Button>
                    </Link>
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