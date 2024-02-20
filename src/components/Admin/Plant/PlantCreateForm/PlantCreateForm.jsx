import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPlant, deletePlant, getPlantById, updatePlant } from "../../../../functions/PlantRequests";
import './PlantCreateForm.css';
import { Box, CircularProgress, Container, Fab, FormControlLabel, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Tooltip } from "@mui/material";
import { Cancel, Delete, RemoveRedEye, Save } from "@mui/icons-material";
import { useSnackbar } from "../../../../context/SnackbarContext";
import * as criterias from "../../../../utils/filter_criterias";
import Checkbox from '@mui/material/Checkbox';
import Dropdown from "../../../ui/Dropdown/Dropdown";
import { useTheme } from "../../../../utils/themeProvider";

const PlantExtend = () => {

    const { id } = useParams();
    const [plant, setPlant] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSketch, setSelectedSketch] = useState(null);
    const navigate = useNavigate();
    const { handleClick } = useSnackbar();
    const [isLoading, setIsLoading] = useState(true);
    const { theme } = useTheme();

    const themeInputStyle = {
        backgroundColor: theme.palette.mode === 'light' ? 'white' : '#303030', 
        color: theme.palette.text.primary,
        fontSize: '1.0rem',
        width: '100%',
        border: theme.palette.mode === 'light' ? '' : 'none',

    };

    useEffect(() => {
        if (id > 0) {
            getPlantById(id)
                .then((res) => setPlant(res))
                .finally(() => {
                    setIsLoading(false);
                });;
        } else {
            setIsLoading(false);
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
                navigate(`/admin#plants`);
                handleClick('success', 'Успішно видалено!')
            }
        }
    }

    const handleImageChange = (file) => {
        setSelectedImage(file);
        handleChange({ target: { name: 'image', value: file.name } })
    };

    const handleSketchChange = (file) => {
        setSelectedSketch(file);
        handleChange({ target: { name: 'sketch', value: file.name } })
    };

    const handleCheckboxChange = (name, itemValue) => {
        const values = plant[name]?.split(";"); // Split the string into an array
        if (!values) {
            setPlant(prevPlant => ({
                ...prevPlant,
                [name]: itemValue
            }));
        } else {
            const index = values.indexOf(itemValue);

            if (index !== -1) {
                values.splice(index, 1); // Remove the item from the array
            } else {
                values.push(itemValue); // Add the item to the array
            }

            setPlant(prevPlant => ({
                ...prevPlant,
                [name]: values.join(';') // Join the array back into a string
            }));
        }
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                <CircularProgress />
            </Box>
        );
    };

    return (
        <Container>
            <form>
                <h1>Редагування розсади | ID: {plant.id}</h1>

                <table className="plant-table">
                    <tbody>
                        <tr>
                            <th>Name/Назва</th>
                            <td>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={plant.name || ''}
                                    onChange={handleChange}
                                    style={themeInputStyle} />
                            </td>
                        </tr>
                        <tr>
                            <th>Latin Name/Латинь</th>
                            <td><input
                                type="text"
                                id="latinName"
                                name="latinName"
                                value={plant.latinName || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>Height/Висота</th>
                            <td><input
                                type="text"
                                id="height"
                                name="height"
                                value={plant.height || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>Color/Забарвлення</th>
                            <td><input
                                type="text"
                                id="color"
                                name="color"
                                value={plant.color || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>Summer Color/Літнє Забарвлення</th>
                            <td><input
                                type="text"
                                id="summerColor"
                                name="summerColor"
                                value={plant.summerColor || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>Autumn Color/Осіннє забарвлення</th>
                            <td><input
                                type="text"
                                id="autumnColor"
                                name="autumnColor"
                                value={plant.autumnColor || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>Flowering Color/Колір цвітіння</th>
                            <td><input
                                type="text"
                                id="floweringColor"
                                name="floweringColor"
                                value={plant.floweringColor || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>

                        <tr>
                            <th>Habitus/Габітус</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.habitus}</div>

                                <Dropdown>
                                    {criterias.habitus().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'habitus', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Growth Rate/Темп росту</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.growthRate}</div>

                                <Dropdown>
                                    {criterias.growth_rate().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'growthRate', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Frost Resistance/Морозостійкість</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.frostResistance}</div>
                                <Dropdown>
                                    {criterias.frost_resistance().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'frostResistance', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Recommendation/Рекомендації для посадки</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.recommendation} </div>
                                <Dropdown>
                                    {criterias.place_recommendation().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'recommendation', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Lighting/Освітлення</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.lighting}</div>
                                <Dropdown>
                                    {criterias.lighting().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'lighting', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Evergreen/Вічнозелене</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.evergreen}</div>
                                <Dropdown>
                                    {criterias.evergreen().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'evergreen', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Flowering Period/Період цвітіння</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.floweringPeriod}</div>
                                <Dropdown>
                                    {criterias.flowering_period().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'floweringPeriod', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Plant Type/Вид</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.plantType}</div>
                                <Dropdown>
                                    {criterias.type().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'plantType', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Zoning/Зонування</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.zoning}</div>
                                <Dropdown>
                                    {criterias.zoning().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'zoning', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Hardy/Витривалість</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.hardy}</div>
                                <Dropdown>
                                    {criterias.hardy().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'hardy', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>pH/Кислотність</th>
                            <td className="d-flex justify-content-between">
                                <input
                                    type="text"
                                    id="ph"
                                    name="ph"
                                    value={plant.ph || ''}
                                    onChange={handleChange} 
                                    style={themeInputStyle}/>

                                <Dropdown>
                                    {criterias.ph().map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={item.value}
                                            control={<Checkbox />}
                                            label={item.label}
                                            checked={plant?.ph?.includes(item.value)}
                                            onChange={() => handleCheckboxChange('ph', item.value)}
                                        />
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>Soil Moisture/Вологість грунту</th>
                            <td className="d-flex justify-content-between">
                                <input
                                    type="text"
                                    id="soilMoisture"
                                    name="soilMoisture"
                                    value={plant.soilMoisture || ''}
                                    onChange={handleChange} 
                                    style={themeInputStyle}/>

                                <Dropdown>
                                    {criterias.soil_moisture().map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={item.value}
                                            control={<Checkbox />}
                                            label={item.label}
                                            checked={plant?.soilMoisture?.includes(item.value) || false}
                                            onChange={() => handleCheckboxChange('soilMoisture', item.value)}
                                        />
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>

                        <tr>
                            <th>Nutrition/Живлення</th>
                            <td className="d-flex justify-content-between">
                                <input
                                    type="text"
                                    id="nutrition"
                                    name="nutrition"
                                    value={plant.nutrition || ''}
                                    onChange={handleChange} 
                                    style={themeInputStyle}/>

                                <Dropdown>
                                    {criterias.nutrition().map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={item.value}
                                            control={<Checkbox />}
                                            label={item.label}
                                            checked={plant.nutrition?.includes(item.value) || false}
                                            onChange={() => handleCheckboxChange('nutrition', item.value)}
                                        />
                                    ))}
                                </Dropdown>
                            </td>
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
        </Container>
    );
}

export default PlantExtend;