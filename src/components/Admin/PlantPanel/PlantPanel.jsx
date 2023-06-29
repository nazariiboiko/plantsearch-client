import { useEffect } from "react";
import { getAllPlants } from "../../../functions/plantRequests";
import { useState } from "react";
import { Link } from "react-router-dom";

const PlantPanel = ({onInputChange}) => {

    const [plants, setPlants] = useState();

    useEffect(() => {
        getAllPlants(1, 50).then((res) => setPlants(res));
    },[]);

    const handleChange = (event) => {
        const value = event.target.value;
    }

    return (
        <div>
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
              {plants?.map((plant) => (
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