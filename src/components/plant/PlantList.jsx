import { Link, useNavigate } from 'react-router-dom';
import './Plant.css';
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, styled } from '@mui/material';
import { image_store } from '../../utils/constants';
import { QuestionMark } from '@mui/icons-material';

const PlantList = ({ response, title, text, showOrder }) => {

  const navigate = useNavigate();

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
        <div className="home-plant-list mb-20">
          {response?.data?.map(plant => (
            <div key={plant.id} className="home-plant-card justify-content-center" onClick={() => navigate(`/plant/${plant.id}`)}>
              <img src={`${image_store}/images/${plant.image || 'no_image.png'}`} alt={plant.name} className="home-plant-image" />
              <div className='home-plant-title'>
                <h2 className="home-plant-name">{plant.name}</h2>
                <h6 className="home-latin-name">{plant.latinName}</h6>
              </div>
            </div>
          ))}
        </div>
      )
      }
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
                    <TableCell align="center"><img src={`${image_store}/sketches/${plant.sketch || 'no_image.png'}`} alt="sketch" style={{ width: '100px', height: '100px' }}></img></TableCell>
                    <TableCell align='center'>
                      <Tooltip title="Переглянути" placement="top">
                        <Link to={`/plant/${plant.id}`}>
                          <Fab color="success"><QuestionMark /></Fab>
                        </Link>
                      </Tooltip>
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