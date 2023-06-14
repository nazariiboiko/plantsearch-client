import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlantById } from "../../functions/plantRequests";

const Header = () => {

    const { id } = useParams();
    const [plant, setPlant] = useState({});

    useEffect(()  => {
        getPlantById(id).then((res) => setPlant(res));
        },[id]);

    return (
        <div className="container">
            <table className="table table-striped">
      <tbody>
        <tr>
          <th>Name</th>
          <td>{plant.name}</td>
        </tr>
        <tr>
          <th>Latin Name</th>
          <td>{plant.latinName}</td>
        </tr>
        <tr>
          <th>Height</th>
          <td>{plant.height}</td>
        </tr>
        <tr>
          <th>Habitus</th>
          <td>{plant.habitus}</td>
        </tr>
        <tr>
          <th>Growth Rate</th>
          <td>{plant.growthRate}</td>
        </tr>
        <tr>
          <th>Color</th>
          <td>{plant.color}</td>
        </tr>
        <tr>
          <th>Summer Color</th>
          <td>{plant.summerColor}</td>
        </tr>
        <tr>
          <th>Autumn Color</th>
          <td>{plant.autumnColor}</td>
        </tr>
        <tr>
          <th>Flowering Color</th>
          <td>{plant.floweringColor}</td>
        </tr>
        <tr>
          <th>Frost Resistance</th>
          <td>{plant.frostResistance}</td>
        </tr>
        <tr>
          <th>Sketch</th>
          <td><img src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`} alt="sketch" style={{ width: '20%', height: '20%' }}></img></td>
        </tr>
        <tr>
          <th>Image</th>
          <td><img src={`https://plantsearch.s3.eu-north-1.amazonaws.com/images/${plant.image}`} alt="img" style={{ width: '20%', height: '20%' }}></img></td>
        </tr>
        <tr>
          <th>Recommendation</th>
          <td>{plant.recommendation}</td>
        </tr>
        <tr>
          <th>Lighting</th>
          <td>{plant.lighting}</td>
        </tr>
        <tr>
          <th>Evergreen</th>
          <td>{plant.evergreen}</td>
        </tr>
        <tr>
          <th>Flowering Period</th>
          <td>{plant.floweringPeriod}</td>
        </tr>
        <tr>
          <th>Plant Type</th>
          <td>{plant.plantType}</td>
        </tr>
        <tr>
          <th>Zoning</th>
          <td>{plant.zoning}</td>
        </tr>
        <tr>
          <th>pH</th>
          <td>{plant.ph}</td>
        </tr>
        <tr>
          <th>Soil Moisture</th>
          <td>{plant.soilMoisture}</td>
        </tr>
        <tr>
          <th>Hardy</th>
          <td>{plant.hardy}</td>
        </tr>
        <tr>
          <th>Nutrition</th>
          <td>{plant.nutrition}</td>
        </tr>
      </tbody>
    </table>
        </div>
    );
};

export default Header;