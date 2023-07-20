import { useEffect } from "react";
import { getAllPlants, getPlantById, getPageablePlantByName } from "../../../functions/plantRequests";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';

const PlantPanel = ({ onInputChange }) => {

  let searchTimeout;
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [response, setResponse] = useState();
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    getAllPlants(1, pageSize).then((res) => setResponse(res));
  }, []);

  const handleInputChange = (e) => {
    const q = e.target.value;
    setKeyword(q);
    setPageNumber(1);
    handleRequest(q);
  };

  const handleRequest = (q) => {
    if (q === null)
      q = keyword;

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
        <ul className="d-flex">
          <li className="d-inline">
            <Link to={`-1`}>
              <button className="btn btn-success">Добавити</button>
            </Link>
          </li>
          <li className="d-inline admin-input">
            <input
              placeholder='Знайти Назва, латинь, ID'
              onChange={handleInputChange}
            />
          </li>
        </ul>
      </div>

      <div class="justify-content-center">
        <Pagination
          variant="outlined"
          shape="rounded"
          count={Math.ceil(response?.totalSize / response?.pageSize)}
          page={pageNumber}
          onChange={handlePageChange}
        />
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Назва</th>
            <th>Латинь</th>
            <th>Ескіз</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {response?.data?.map((plant) => (
            <tr key={plant.id}>
              <td>{plant.id}</td>
              <td>
                {plant.name}
              </td>
              <td>
                {plant.latinName}
              </td>
              <td>
                <img src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`} alt="sketch" style={{ width: '50%', height: '50%' }}></img>
              </td>
              <td>
                <Link to={`${plant.id}`}>
                  <button className="admin-controll-button right-border">Детальніше</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

}

export default PlantPanel;