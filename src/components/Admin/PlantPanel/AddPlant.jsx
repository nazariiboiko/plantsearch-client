import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPlant } from "../../../functions/plantRequests";
import './PlantPanel.css';
import { Box, Chip, Fab, Paper, TextField, Tooltip } from "@mui/material";
import { Cancel, Save } from "@mui/icons-material";
import * as criteria from '../../../utils/filter_criterias';
import { Dropdown, Form } from 'react-bootstrap';
import { useSnackbar } from "../../../context/SnackbarContext";

const AddPlant = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSketch, setSelectedSketch] = useState(null);
  const navigate = useNavigate();
  const [selectedCriteria, setSelectedCriteria] = useState({});
  const { handleClick } = useSnackbar();

  useEffect(() => {

  }, []);

  const handleChange = ({ target: { value, name } }) => {
    setSelectedCriteria((prevPlant) => ({
      ...prevPlant,
      [name]: [value]
    }));
  };

  const handleSubmit = () => {
    createPlant(parseToJson(selectedCriteria), selectedImage, selectedSketch)
      .then((id) => {
        const confirmed = window.confirm(`Розсада створена з ID: ${id}, продовжити додавати?`);
        if (confirmed) {
          handleClick('success', 'Успішно створено! Продовжуйте додавати!');
          setSelectedCriteria([]);
        }
        if (!confirmed) {
          navigate(`/admin/plant/${id}`)
        }
      });
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

  const handleCancel = () => {
    handleClick('warning', 'Усі зміни було скасовано!');
    setSelectedCriteria([]);
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
    <div className="container mt-30">
      <Box component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          marginBottom: '30px',
        }}>
        <Paper elevation={7} style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div className="h1 text-center">Добавити розсаду</div>
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
                  </div>
                </div>
                <div>
                  <label className="fw-bold">Ескіз</label>
                  <div>
                    <input type="file" required onChange={(e) => handleSketchChange(e.target.files[0])} />
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
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default AddPlant;