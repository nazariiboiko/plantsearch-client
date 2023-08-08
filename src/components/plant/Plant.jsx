import React from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPlantById } from "../../functions/plantRequests";
import './Plant.css';
import { useAuth, getRole } from "../../functions/authUtils";
import { getFavourites, doLike } from "../../functions/favouriteRequests";
import * as request from "../../functions/supplierRequests";
import { Check, Close } from "@mui/icons-material";

const Plant = () => {

  const { id } = useParams();
  const [plant, setPlant] = useState({});
  const isAuth = useAuth();
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [availableSuppliers, setAvailableSuppliers] = useState([]);

  useEffect(() => {
    getPlantById(id).then((res) => {
      setPlant(res);
      if (isAuth) {
        getFavourites().then((res) => {
          res.map((item) => {
            if (id == item.id) {
              setLike(true);
            }
          });
        });
      };
    });
    request.getAllSuppliers().then((res) => setSuppliers(res));
    request.getSupplierByPlant(id)
      .then(res => {
        const data = res.map(supplier => supplier.id);
        setAvailableSuppliers(data);
      })
      .catch(error => {
        console.error('Error fetching available suppliers:', error);
      });

  }, [id, isAuth]);



  const handleLike = () => {
    doLike(id);
    setLike(!like);
  }

  return (
    <div className="container pb-5 plant-shadow">
      <div>
        <div className="h1 mt-3 text-center" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ textAlign: "center", flex: "1" }}>{plant.name}
            {isAuth == true && getRole() === "ADMIN" && (
              <button className="btn btn-primary ml-10" onClick={x => navigate(`/admin/plant/${id}`)}><i class="fas fa-edit"></i></button>
            )}
          </div>
          {isAuth == true && (
            <div>
              <a onClick={x => handleLike()}>
                {like === true && (<i class="fa-solid fa-heart"></i>)}
                {like === false && (<i className="fa-regular fa-heart"></i>)}
              </a>
            </div>
          )}
        </div>
        <div className='h5 text-center '>({plant.latinName})</div>
      </div>
      <hr />
      <div>
        <div className="row ml-20">
          <div className="col-md-3 border-right">
            <div className="text-center fw-bold">Зображення</div>
            <img className="plant-image mt-5" src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`} alt="sketch"></img>
            <img className="plant-image mt-5" src={`https://plantsearch.s3.eu-north-1.amazonaws.com/images/${plant.image}`} alt="img" ></img>
          </div>
          <div className="col-md-6 border-right">
            <div className="text-center fw-bold ">Характеристика</div>
            <table className="table">
              <tbody>
                <tr><th></th><td></td></tr>
                {plant.height && (
                  <tr>
                    <th>Висота:</th>
                    <td>{plant.height}м</td>
                  </tr>
                )}
                {plant.habitus && (
                  <tr>
                    <th>Габітус:</th>
                    <td>{plant.habitus}</td>
                  </tr>
                )}

                {plant.growthRate && (
                  <tr>
                    <th>Темп росту:</th>
                    <td>{plant.growthRate}</td>
                  </tr>
                )}
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
                {plant.lighting && (
                  <tr>
                    <th>Освітлення:</th>
                    <td>{plant.lighting}</td>
                  </tr>
                )}

                {plant.evergreen && (
                  <tr>
                    <th>Вічнозелене:</th>
                    <td>{plant.evergreen}</td>
                  </tr>
                )}

                {plant.floweringPeriod && (
                  <tr>
                    <th>Період цвітіння:</th>
                    <td>{plant.floweringPeriod}</td>
                  </tr>)}
                {plant.plantType && (
                  <tr>
                    <th>Тип сажанця:</th>
                    <td>{plant.plantType}</td>
                  </tr>
                )}
                {plant.zoning && (
                  <tr>
                    <th>Зонування:</th>
                    <td>{plant.zoning}</td>
                  </tr>
                )}

                {plant.ph && (
                  <tr>
                    <th>Кислотність:</th>
                    <td>{plant.ph}</td>
                  </tr>)}
                {plant.soilMoisture && (
                  <tr>
                    <th>Вологість грунту:</th>
                    <td>{plant.soilMoisture}</td>
                  </tr>
                )}
                {plant.hardy && (
                  <tr>
                    <th>Стійкість:</th>
                    <td>{plant.hardy}</td>
                  </tr>)}
                {plant.nutrition && (
                  <tr>
                    <th>Живлення:</th>
                    <td>{plant.nutrition}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-md-3">
            <div className="text-center fw-bold">Наявність</div>
            <table className="table">
              <tbody>
                <tr><th></th><td></td></tr>
                {suppliers?.data?.map((supplier) => (
                  <tr key={supplier.id}>
                    <th>{supplier.name}</th>
                    <td>
                      {availableSuppliers.includes(supplier.id) ? (
                        <Check fontSize="small" />
                      ) : (
                        <Close fontSize="small" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Plant;