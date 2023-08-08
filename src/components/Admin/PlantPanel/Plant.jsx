import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPlant, deletePlant, getPlantById, updatePlant } from "../../../functions/plantRequests";
import './PlantPanel.css';
import { Box, Chip, Fab, Paper, TextField, Tooltip } from "@mui/material";
import { ArrowBack, Cancel, Delete, MoreHoriz, RemoveRedEye, Save } from "@mui/icons-material";
import * as criteria from '../../../utils/filter_criterias';
import { Dropdown, Form } from 'react-bootstrap';
import PlantExtend from "./PlantExtend";

const Plant = () => {

  const { id } = useParams();
  const [plant, setPlant] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSketch, setSelectedSketch] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [recommendationValue, setRecommendationValue] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState({});
  const [showMore, setShowMore] = useState(false);

  const actions = [
    { icon: <Save />, name: 'Save' },
  ];

  useEffect(() => {
    if (id > 0) {
      getPlantById(id).then((res) => {
        setPlant(res);
        setSelectedCriteria(parseToObjectFormat(res));
      });

    }
  }, [id]);

  const handleChange = ({ target: { value, name } }) => {
    setSelectedCriteria((prevPlant) => ({
      ...prevPlant,
      [name]: [value]
    }));
  };

  const handleCancel = () => {
    if (id > 0) {
      getPlantById(id).then((res) => setSelectedCriteria(parseToObjectFormat(res)));
    } else {
      setSelectedValues([]);
    }
  }

  const handleSubmit = () => {
    if (id > 0) {
      updatePlant(parseToJson(selectedCriteria), selectedImage, selectedSketch);
    } else {
      createPlant(parseToJson(selectedCriteria), selectedImage, selectedSketch)
        .then((id) => navigate(`/admin/plant/${id}`));
    }
  }

  const handleDelete = () => {
    if (id > 0) {
      const confirmed = window.confirm('Ви впевнені що хочете видалити?');
      if (confirmed) {
        deletePlant(id);
        navigate(`/admin/plant`);
      }
    }
  }

  const handleCheckboxChange = (id, value) => {
    setSelectedCriteria((prevValues) => {
      const currentValues = prevValues[id] || [];
      if (currentValues.includes(value)) {
        // If the value is already in the array, remove it
        return {
          ...prevValues,
          [id]: currentValues.filter((item) => item !== value),
        };
      } else {
        // If the value is not in the array, add it
        return {
          ...prevValues,
          [id]: [...currentValues, value],
        };
      }
    });
  };


  const handleImageChange = (file) => {
    setSelectedImage(file);
    handleChange({ target: { name: 'image', value: file.name } })
  }

  const handleSketchChange = (file) => {
    setSelectedSketch(file);
    handleChange({ target: { name: 'sketch', value: file.name } })
  }



  const parseToObjectFormat = (plant) => {
    const res = {};
    Object.keys(plant).forEach((key) => {
      if (typeof plant[key] === 'string') {
        const valuesArray = plant[key].split(';').map((value) => value.trim());
        res[key] = valuesArray;
      }
    });
    res['id'] = [plant.id];
    return res;
  };

  const parseToJson = () => {
    const res = {};
    Object.keys(selectedCriteria).forEach((criterionId) => {
      res[criterionId] = selectedCriteria[criterionId].join('; ');
    });
    return res;
  };

  return (
    <div className="container">
      {!showMore && (

        <Box component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            marginBottom: '30px',
          }}>
          <Paper elevation={3} style={{ paddingTop: '10px', paddingBottom: '10px' }}>
            <div className="h1 text-center">Редагування розсади</div>
            <hr />
            <div>
              <TextField
                id="name"
                name="name"
                value={selectedCriteria.name || ''}
                label="Назва"
                variant="standard"
                style={{ marginLeft: '50px', minWidth: 240, marginBottom: '30px' }}
                onChange={handleChange} />
              <TextField
                id="latinName"
                name="latinName"
                value={selectedCriteria.latinName || ''}
                label="Латинь"
                variant="standard"
                style={{ marginLeft: '50px', minWidth: 240, marginBottom: '30px' }}
                onChange={handleChange} />
              <TextField
                id="height"
                name="height"
                value={selectedCriteria.height || ''}
                label="Висота"
                variant="standard"
                type="number"
                style={{ marginLeft: '50px', minWidth: 245, marginBottom: '30px' }}
                onChange={handleChange} />
            </div>
            <div>
              <TextField
                id="color"
                name="color"
                value={selectedCriteria.color || ''}
                label="Забарвлення"
                variant="standard"
                style={{ marginLeft: '50px', minWidth: 240, marginBottom: '30px' }}
                onChange={handleChange} />
              <TextField
                id="summerColor"
                name="summerColor"
                value={selectedCriteria.summerColor || ''}
                label="Літнє забарвлення"
                variant="standard"
                style={{ marginLeft: '50px', minWidth: 240, marginBottom: '30px' }}
                onChange={handleChange} />
              <TextField
                id="autumnColor"
                name="autumnColor"
                value={selectedCriteria.autumnColor || ''}
                label="Осіннє забарвлення"
                variant="standard"
                style={{ marginLeft: '50px', minWidth: 240, marginBottom: '30px' }}
                onChange={handleChange} />
              <TextField
                id="floweringColor"
                name="floweringColor"
                value={selectedCriteria.floweringColor || ''}
                label="Колір цвітіння"
                variant="standard"
                type="standard"
                style={{ marginLeft: '50px', minWidth: 245, marginBottom: '30px' }}
                onChange={handleChange} />
            </div>
            <div>
              <hr />
              <Box sx={{ marginLeft: '50px' }}>
                {criteria.customCriterias().map((criterion) => {
                  return (
                    <div key={criterion.id} className="d-flex mb-10">
                      <Dropdown key={criterion.label}>
                        <Dropdown.Toggle variant="light" id="dropdown-checkbox">
                          {criterion.label}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {criterion.value.map((item) => (
                            <Form.Check
                              key={item.value}
                              type="checkbox"
                              id={item.value}
                              label={item.label}
                              checked={selectedCriteria[criterion.id]?.includes(item.value)}
                              onChange={() => handleCheckboxChange(criterion.id, item.value)}
                            />
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                      {criterion.value.map((item) => (
                        selectedCriteria[criterion.id]?.includes(item.value) ? (
                          <Chip
                            key={item.value}
                            label={item.label}
                            className="mr-5"
                            onDelete={() => handleCheckboxChange(criterion.id, item.value)}
                          />
                        ) : null
                      ))}

                    </div>
                  );
                })}
                <div className="d-flex flex-row">
                  <div className="mb-4">
                    <label className="fw-bold">Зображення</label>
                    <div>
                    <input type="file" required onChange={(e) => handleImageChange(e.target.files[0])} />
                    {id > 0 && (
                      <img
                        src={`https://plantsearch.s3.eu-north-1.amazonaws.com/images/${plant.image}`}
                        alt="img"
                        className="mt-2"
                        style={{ width: '30%', height: 'auto' }}
                      />
                    )}
                    </div>
                  </div>
                  <div>
                    <label className="fw-bold">Ескіз</label>
                    <div>
                    <input type="file" required onChange={(e) => handleSketchChange(e.target.files[0])} />
                    {id > 0 && (
                      <img
                        src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`}
                        alt="sketch"
                        className="mt-2"
                        style={{ width: '30%', height: 'auto' }}
                      />
                    )}
                    </div>
                  </div>
                </div>
              </Box>
            </div>

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
              <Tooltip title="Повний доступ" placement="top">
                <Fab color="warning" aria-label="add" onClick={() => setShowMore(true)}>
                  <MoreHoriz />
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
          </Paper>
        </Box>
      )}
      {showMore && (
        <>
          <PlantExtend />
          <Tooltip title="Повернутись" placement="top">
            <Fab color="error" aria-label="add" onClick={() => setShowMore(false)}>
              <ArrowBack />
            </Fab>
          </Tooltip>
        </>
      )}
    </div>
  );
}

export default Plant;