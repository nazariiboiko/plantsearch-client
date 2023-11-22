import axios from 'axios';
import { API_PLANTS } from '../utils/constants';
import { allCriterias } from '../utils/filter_criterias';
import { getToken } from './AuthUtils';

export const getAllPlants = async (page = 0, size = 20, sort = 'id') => {
    return await axios
        .get(`${API_PLANTS}?page=${page}&size=${size}`)
        .then((response) => response.data);
}

export const getPlantById = async (id) => {
    return await axios
        .get(`${API_PLANTS}/${id}`)
        .then((response) => response.data);
}

export const findPlantByKeyword = async (keyword = '', page = 0, size = 20) => {
    return await axios
        .get(`${API_PLANTS}/search?name=${keyword}&page=${page}&size=${size}`)
        .then((response) => response.data);
}

export const getAutocompleteByName = async (name) => {
    return await axios
        .get(`${API_PLANTS}/autocomplete?name=${name}`)
        .then((response) => response.data);
};

export const getRandomPlants = async (amount = 1) => {
    return await axios
        .get(`${API_PLANTS}/random?amount=${amount}`)
        .then((response) => response.data);
}

export const getPlantsByCriteria = async (selectedValues = {}, inputValue = null, page = 1, size = 20) => {
    const selectedCriteria = {};
    allCriterias().forEach((criterion) => {
        const selectedItems = criterion.value.filter((item) =>
            selectedValues?.includes(item.value)
        );
        selectedCriteria[criterion.id] = selectedItems.map((item) => item.value);
    });
    selectedCriteria['name'] = inputValue;

    console.info(selectedCriteria);
    return await axios
        .post(`${API_PLANTS}/filter?page=${page}&size=${size}`, selectedCriteria)
        .then((response) => response.data);
}

export const createPlant = async (plant, image = null, sketch = null) => {
    const token = getToken();
    const formData = new FormData();

    formData.append('plantDto', new Blob([JSON.stringify(plant)], { type: 'application/json' }));
    formData.append('image', image);
    formData.append('sketch', sketch);
    const response = await axios.post(`${API_PLANTS}/create`, formData, {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
}

export const deletePlant = async () => {

}

export const updatePlant = async (plant, image = null, sketch = null) => {
    const token = getToken();
    const formData = new FormData();

    formData.append('plantDto', new Blob([JSON.stringify(plant)], { type: 'application/json' }));
    formData.append('image', image);
    formData.append('sketch', sketch);
    const response = await axios.post(`${API_PLANTS}/update`, formData, {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};
