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
import { useTranslation } from "react-i18next";

const PlantExtend = () => {

    const { id } = useParams();
    const [plant, setPlant] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSketch, setSelectedSketch] = useState(null);
    const navigate = useNavigate();
    const { handleClick } = useSnackbar();
    const [isLoading, setIsLoading] = useState(true);
    const { theme } = useTheme();
    const { t } = useTranslation();

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
            handleClick('warning', t('alerts.allCanceled'));
        }
    }

    const handleSubmit = () => {
        if (id > 0) {
            updatePlant(plant, selectedImage, selectedSketch);
            handleClick('success', t('alerts.allUpdated'));
        } else {
            createPlant(plant, selectedImage, selectedSketch)
                .then((id) =>
                    navigate(`/admin/plant/${id}`));
            handleClick('success', t('alerts.allAdded'));
        };
    }

    const handleDelete = () => {
        if (id > 0) {
            const confirmed = window.confirm(t('confirm.delete'));
            if (confirmed) {
                deletePlant(id);
                navigate(`/admin#plants`);
                handleClick('success', t('alerts.allDeleted'));
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
                <h1>{t('actions.edit')} | ID: {plant.id}</h1>

                <table className="plant-table">
                    <tbody>
                        <tr>
                            <th>{t('plant.name')}</th>
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
                            <th>{t('plant.latinName')}</th>
                            <td><input
                                type="text"
                                id="latinName"
                                name="latinName"
                                value={plant.latinName || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>{t('plant.height')}</th>
                            <td><input
                                type="text"
                                id="height"
                                name="height"
                                value={plant.height || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>{t('filter.name.color')}</th>
                            <td><input
                                type="text"
                                id="color"
                                name="color"
                                value={plant.color || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>{t('filter.name.summerColor')}</th>
                            <td><input
                                type="text"
                                id="summerColor"
                                name="summerColor"
                                value={plant.summerColor || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>{t('filter.name.autumnColor')}</th>
                            <td><input
                                type="text"
                                id="autumnColor"
                                name="autumnColor"
                                value={plant.autumnColor || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>
                        <tr>
                            <th>{t('filter.name.floweringColor')}</th>
                            <td><input
                                type="text"
                                id="floweringColor"
                                name="floweringColor"
                                value={plant.floweringColor || ''}
                                onChange={handleChange} 
                                style={themeInputStyle}/></td>
                        </tr>

                        <tr>
                            <th>{t('filter.name.habitus')}</th>
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
                            <th>{t('filter.name.growthRate')}</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.growthRate}</div>

                                <Dropdown>
                                    {criterias.growthRate().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'growthRate', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>{t('filter.name.frostResistance')}</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.frostResistance}</div>
                                <Dropdown>
                                    {criterias.frostResistance().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'frostResistance', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>{t('filter.name.recommendation')}</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.recommendation} </div>
                                <Dropdown>
                                    {criterias.placeRecommendation().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'recommendation', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>{t('filter.name.lighting')}</th>
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
                            <th>{t('filter.name.evergreen')}</th>
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
                            <th>{t('filter.name.floweringPeriod')}</th>
                            <td className="d-flex justify-content-between">
                                <div>{plant.floweringPeriod}</div>
                                <Dropdown>
                                    {criterias.floweringPeriod().map((item, index) => (
                                        <MenuItem key={index} onClick={() => handleChange({ target: { name: 'floweringPeriod', value: item.value } })}>
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Dropdown>
                            </td>
                        </tr>
                        <tr>
                            <th>{t('filter.name.plantType')}</th>
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
                            <th>{t('filter.name.zoning')}</th>
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
                            <th>{t('filter.name.hardy')}</th>
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
                            <th>{t('filter.name.ph')}</th>
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
                            <th>{t('filter.name.soilMoisture')}</th>
                            <td className="d-flex justify-content-between">
                                <input
                                    type="text"
                                    id="soilMoisture"
                                    name="soilMoisture"
                                    value={plant.soilMoisture || ''}
                                    onChange={handleChange} 
                                    style={themeInputStyle}/>

                                <Dropdown>
                                    {criterias.soilMoisture().map((item, index) => (
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
                            <th>{t('filter.name.nutrition')}</th>
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
                            <th>{t('plant.sketch')}</th>
                            <td>
                                <input type="file" required
                                    onChange={(e) => handleSketchChange(e.target.files[0])} />
                                {id > 0 && (<img src={`https://plantsearch.s3.eu-north-1.amazonaws.com/sketches/${plant.sketch}`}
                                    alt="sketch"
                                    style={{ width: '20%', height: '20%' }}></img>)}
                            </td>
                        </tr>
                        <tr>
                            <th>{t('plant.image')}</th>
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
                <Tooltip title={t('actions.save')}  placement="top">
                    <Fab color="success" aria-label="add" onClick={handleSubmit}>
                        <Save />
                    </Fab>
                </Tooltip>
                <Tooltip title={t('actions.cancel')} placement="top">
                    <Fab color="warning" aria-label="add" onClick={handleCancel}>
                        <Cancel />
                    </Fab>
                </Tooltip>
                <Tooltip title={t('actions.watch')} placement="top">
                    <Fab color="warning" aria-label="add" onClick={() => navigate(`/plant/${id}`)}>
                        <RemoveRedEye />
                    </Fab>
                </Tooltip>
                <Tooltip title={t('actions.delete')} placement="top">
                    <Fab color="error" aria-label="add" onClick={handleDelete}>
                        <Delete />
                    </Fab>
                </Tooltip>
            </Box>
        </Container>
    );
}

export default PlantExtend;