import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPlant, deletePlant, getPlantById, updatePlant } from "../../../functions/plantRequests";
import './PlantPanel.css';
import { Box, Fab, Tooltip } from "@mui/material";
import { Cancel, Delete, RemoveRedEye, Save } from "@mui/icons-material";
import { useSnackbar } from "../../../context/SnackbarContext";

const PlantExtend = () => {

  const { id } = useParams();
  const [plant, setPlant] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSketch, setSelectedSketch] = useState(null);
  const navigate = useNavigate();
  const { handleClick } = useSnackbar();

  useEffect(() => {
    if (id > 0) {
      getPlantById(id).then((res) => setPlant(res));
    }
  }, [id]);

  const handleChange = ({ target: { name, value } }) => {
    setPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (id > 0) {
      getPlantById(id).then((res) =>
        setPlant(res));
      handleClick('warning', 'Скасовано усі зміни!');
    }
  }

  const handleSubmit = () => {
    if (id > 0) {
      updatePlant(plant, selectedImage, selectedSketch);
      handleClick('success', 'Успішно обновлено!')
    } else {
      createPlant(plant, selectedImage, selectedSketch)
        .then((id) =>
          navigate(`/admin/plant/${id}`));
      handleClick('success', 'Успішно створено!');
    };
  }

  const handleDelete = () => {
    if (id > 0) {
      const confirmed = window.confirm('Ви впевнені що хочете видалити?');
      if (confirmed) {
        deletePlant(id);
        navigate(`/admin/plant`);
        handleClick('success', 'Успішно видалено!')
      }
    }
  }

  const handleImageChange = (file) => {
    setSelectedImage(file);
    handleChange({ target: { name: 'image', value: file.name } })
  }

  const handleSketchChange = (file) => {
    setSelectedSketch(file);
    handleChange({ target: { name: 'sketch', value: file.name } })
  }

  return (
    <div className="container">
      <form>
        <h1>Редагування розсади</h1>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Name/Назва</th>
              <td><input
                type="text"
                id="name"
                name="name"
                value={plant.name || ''}
                onChange={handleChange} />
                </td>
            </tr>
            <tr>
              <th>Latin Name/Латинь</th>
              <td><input
                type="text"
                id="latinName"
                name="latinName"
                value={plant.latinName || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Height/Висота</th>
              <td><input
                type="text"
                id="height"
                name="height"
                value={plant.height || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Habitus/Габітус</th>
              <td><input
                type="text"
                id="habitus"
                name="habitus"
                value={plant.habitus || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Growth Rate/Темп росту</th>
              <td><input
                type="text"
                id="growthRate"
                name="growthRate"
                value={plant.growthRate || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Color/Забарвлення</th>
              <td><input
                type="text"
                id="color"
                name="color"
                value={plant.color || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Summer Color/Літнє Забарвлення</th>
              <td><input
                type="text"
                id="summerColor"
                name="summerColor"
                value={plant.summerColor || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Autumn Color/Осіннє забарвлення</th>
              <td><input
                type="text"
                id="autumnColor"
                name="autumnColor"
                value={plant.autumnColor || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Flowering Color/Колір цвітіння</th>
              <td><input
                type="text"
                id="floweringColor"
                name="floweringColor"
                value={plant.floweringColor || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Frost Resistance/Морозостійкість</th>
              <td><input
                type="text"
                id="frostResistance"
                name="frostResistance"
                value={plant.frostResistance || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Recommendation/Рекомендації для посадки</th>
              <td><input
                type="text"
                id="recommendation"
                name="recommendation"
                value={plant.recommendation || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Lighting/Освітлення</th>
              <td><input
                type="text"
                id="lighting"
                name="lighting"
                value={plant.lighting || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Evergreen/Вічнозелене</th>
              <td><input
                type="text"
                id="evergreen"
                name="evergreen"
                value={plant.evergreen || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Flowering Period/Період цвітіння</th>
              <td><input
                type="text"
                id="floweringPeriod"
                name="floweringPeriod"
                value={plant.floweringPeriod || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Plant Type/Вид</th>
              <td><input
                type="text"
                id="plantType"
                name="plantType"
                value={plant.plantType || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Zoning/Зонування</th>
              <td><input
                type="text"
                id="zoning"
                name="zoning"
                value={plant.zoning || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>pH/Кислотність</th>
              <td><input
                type="text"
                id="ph"
                name="ph"
                value={plant.ph || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Soil Moisture/Вологість грунту</th>
              <td><input
                type="text"
                id="soilMoisture"
                name="soilMoisture"
                value={plant.soilMoisture || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Hardy/Витривалість</th>
              <td><input
                type="text"
                id="hardy"
                name="hardy"
                value={plant.hardy || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Nutrition/Живлення</th>
              <td><input
                type="text"
                id="nutrition"
                name="nutrition"
                value={plant.nutrition || ''}
                onChange={handleChange} /></td>
            </tr>
            <tr>
              <th>Sketch/Ескіз</th>
              <td>
                <input type="file" required
                  onChange={(e) => handleSketchChange(e.target.files[0])} />
                {id > 0 && (<img src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`}
                  alt="sketch"
                  style={{ width: '20%', height: '20%' }}></img>)}
              </td>
            </tr>
            <tr>
              <th>Image/Фото</th>
              <td>
                <input type="file" required
                  onChange={(e) => handleImageChange(e.target.files[0])} />
                {id > 0 && (<img src={`https://plantsearch.s3.eu-north-1.amazonaws.com/images/${plant.image}`}
                  alt="img"
                  style={{ width: '20%', height: '20%' }}></img>)}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <Box display="flex" justifyContent="space-around" sx={{ marginTop: '30px', marginBottom: '30px' }}>
        <Tooltip title="Зберегти" placement="top">
          <Fab color="success" aria-label="add" onClick={handleSubmit}>
            <Save />
          </Fab>
        </Tooltip>
        <Tooltip title="Скасувати усі зміни" placement="top">
          <Fab color="warning" aria-label="add" onClick={handleCancel}>
            <Cancel />
          </Fab>
        </Tooltip>
        <Tooltip title="Переглянути" placement="top">
          <Fab color="warning" aria-label="add" onClick={() => navigate(`/plant/${id}`)}>
            <RemoveRedEye />
          </Fab>
        </Tooltip>
        <Tooltip title="Видалити" placement="top">
          <Fab color="error" aria-label="add" onClick={handleDelete}>
            <Delete />
          </Fab>
        </Tooltip>
      </Box>
    </div>
  );
}

export default PlantExtend;