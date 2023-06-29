import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlantById } from "../../functions/plantRequests";
import './Plant.css';
import { useAuth } from "../../functions/authUtils";
import { getFavourites, doLike } from "../../functions/userRequests";


const Plant = () => {

    const { id } = useParams();
    const [plant, setPlant] = useState({});
    const isAuth = useAuth();
    const [like, setLike] = useState(false);

    useEffect(() => {
      setLike(false);
      getPlantById(id).then((res) => setPlant(res));
      if (isAuth) {
        getFavourites().then((res) => {
          res.map((item) => {
            if (item.id == id) {
              setLike(true);
            }
          });
        });
      }
    }, [id, isAuth]);
    
      

    const handleLike = () => {
      doLike(id);
      setLike(!like);
    }

    return (
        <div className="container pb-5 plant-shadow">
          <div>
            <div className="h1 mt-3 text-center" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ textAlign: "center", flex: "1" }}>{plant.name}</div>
            {isAuth == true && (
              <div>
                <a onClick={x => handleLike()}>
                  {like == true && (<i class="fa-solid fa-heart"></i>)}
                  {like == false && (<i className="fa-regular fa-heart"></i>)}
                </a>
              </div>
            )}
          </div>
            <div className = 'h5 text-center '>({plant.latinName})</div> 
          </div>
          <hr/>
          <div>
          <div className="row ml-20">
            <div className="col-md-3">
              <div className="text-center fw-bold">Зображення</div>
              <img className="plant-image mt-5" src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`} alt="sketch"></img>
              <img className="plant-image mt-5" src={`https://plantsearch.s3.eu-north-1.amazonaws.com/images/${plant.image}`} alt="img" ></img>
            </div>
            <div className="col-md-6">
            <div className="text-center fw-bold">Характеристика</div>
              <table className="table">
              <tbody>
                  <tr><th></th><td></td></tr>
                  <tr>
                    <th>Висота:</th>
                    <td>{plant.height}м</td>
                  </tr>
                  <tr>
                    <th>Габітус:</th>
                    <td>{plant.habitus}</td>
                  </tr>
                  <tr>
                    <th>Темп росту:</th>
                    <td>{plant.growthRate}</td>
                  </tr>
                  {plant.color && (
                  <tr>
                    <th>Забарвлення:</th>
                    <td>{plant.color}</td>
                  </tr>)}
                  {plant.summerColor && (
                  <tr>
                    <th>Забарвлення (літнє):</th>
                    <td>{plant.summerColor}</td>
                  </tr>)}
                  {plant.autumnColor && (
                  <tr>
                    <th>Забарвлення (осіннє):</th>
                    <td>{plant.autumnColor}</td>
                  </tr>)}
                  {plant.floweringColor && (
                  <tr>
                    <th>Колір цвітіння:</th>
                    <td>{plant.floweringColor}</td>
                  </tr>)}
                  {plant.frostResistance && (
                  <tr>
                    <th>Морозостійкість:</th>
                    <td>{plant.frostResistance}</td>
                  </tr>)}
                  {plant.recommendation && (
                  <tr>
                    <th>Місце для посадки:</th>
                    <td>{plant.recommendation}</td>
                  </tr>)}
                  <tr>
                    <th>Освітлення:</th>
                    <td>{plant.lighting}</td>
                  </tr>
                  <tr>
                    <th>Вічнозелене:</th>
                    <td>{plant.evergreen}</td>
                  </tr>
                  {plant.floweringPeriod && (
                  <tr>
                    <th>Період цвітіння:</th>
                    <td>{plant.floweringPeriod}</td>
                  </tr>)}
                  <tr>
                    <th>Тип сажанця:</th>
                    <td>{plant.plantType}</td>
                  </tr>
                  <tr>
                    <th>Зонування:</th>
                    <td>{plant.zoning}</td>
                  </tr>
                  {plant.ph && (
                  <tr>
                    <th>Кислотність:</th>
                    <td>{plant.ph}</td>
                  </tr>)}
                  <tr>
                    <th>Вологість грунту:</th>
                    <td>{plant.soilMoisture}</td>
                  </tr>
                  {plant.hardy && (
                  <tr>
                    <th>Стійкість:</th>
                    <td>{plant.hardy}</td>
                  </tr>)}
                  <tr>
                    <th>Живлення:</th>
                    <td>{plant.nutrition}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-3">
            <div className="text-center fw-bold">Наявність</div>
            </div>
            </div>
          </div>
        </div>
    );
};

export default Plant;