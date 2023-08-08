import { Link } from 'react-router-dom';
import './Plant.css';
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import { Button } from 'react-bootstrap';
import { image_store } from '../../utils/constants';
import { Info, QuestionMark } from '@mui/icons-material';

const PlantList = ({ response, title, text, showOrder }) => {

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


  return (
    <div className='row plant-shadow'>
      <div className='plant-text-section'>
        <div className='plant-title'>{title}</div>
        <div className='plant-text'>{text}</div>
      </div>

      {showOrder === 'grid' && (
        response?.data?.map((plant) => {
          return (
            <div className="col-md-2 plant-card" key={plant.id}>
              <a>
                <Link to={`/plant/${plant.id}`}>
                  <img className='d-block show-image' src={`https://plantsearch.s3.eu-north-1.amazonaws.com/images/${plant.image}`} alt="plant" />
                  <p className='text-center'>{plant?.name?.length > 21 ? plant.name.slice(0, 21) + '...' : plant.name}</p>
                  <div className="overlay"></div>
                </Link>
              </a>
            </div>
          )
        })
      )}
      {showOrder === 'list' && (
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
              </TableHead>
              <TableBody>
                {response?.data?.map((plant) => (
                  <StyledTableRow key={plant.id}>
                    <TableCell align="center">{plant.name}</TableCell>
                    <TableCell align="center">{plant.latinName}</TableCell>
                    <TableCell align="center"><img src={`${image_store}/sketches/${plant.sketch}`} alt="sketch" style={{ width: '100px', height: '100px' }}></img></TableCell>
                    <TableCell align='center'>
                    {/* <Link to={`/plant/${plant.id}`}>
                        <Fab color="success"><QuestionMark /></Fab>
                      </Link> */}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>

  );
};
export default PlantList;