import api from '../api/axiosConfig';
import { API_PLANTS_RANDOM, API_PLANTS, API_PLANTS_SEARCH, API_PLANTS_FILTER } from '../utils/constants';
import { getToken } from './authUtils';
import * as criteria from '../utils/filter_criterias';


export const getRandomPlants = async (amount) => {
        return await api
        .get(API_PLANTS_RANDOM + `?amount=${amount}`)
        .then((response) => response.data);
};

export const getAllPlants = async (page, size) => {
    return await api
    .get(`${API_PLANTS}?page=${page}&size=${size}`)
    .then((response) => response.data);
}

export const getPlantById = async (id) => {
    return await api
    .get(`${API_PLANTS}/${id}`)
    .then((response) => response.data);
};

export const getPageablePlantByName = async (name, page = 1, size = 4, sort='id') => {
    return await api
    .get(`${API_PLANTS_SEARCH}?keyword=${name}&page=${page}&size=${size}&sort=${sort}`)
    .then((response) => response.data);
};

export const getPlantsByCriterias = async (selectedValues, inputValue, page, size, sort='id') => {
      const selectedCriteria = {};
      criteria.allCriterias().forEach((criterion) => {
        const selectedItems = criterion.value.filter((item) =>
          selectedValues?.includes(item.value)
        );
        selectedCriteria[criterion.id] = selectedItems.map((item) => item.value);
      });
      selectedCriteria['name'] = inputValue;
      
      console.info(selectedCriteria);

      return await api
      .post(`${API_PLANTS_FILTER}?page=${page}&size=${size}&sort=${sort}`, {params: selectedCriteria, page: page, size: size})
      .then((response) =>response.data);
};

export const createPlant = async (plant, image = null, sketch = null) => {
  try {
    const token = getToken();
    const formData = new FormData();

    formData.append('plantDto', new Blob([JSON.stringify(plant)] , { type: 'application/json' }));
    formData.append('image', image);
    formData.append('sketch', sketch);
    const response = await api.post(`${API_PLANTS}/create`, formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
}

export const updatePlant = async (plant, image = null, sketch = null) => {
  try {
    const token = getToken();
    const formData = new FormData();

    formData.append('plantDto', new Blob([JSON.stringify(plant)] , { type: 'application/json' }));
    formData.append('image', image);
    formData.append('sketch', sketch);
    const response = await api.post(`${API_PLANTS}/update`, formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const deletePlant = async (id) => {
  try {
    const token = getToken();
    await api.post(`${API_PLANTS}/delete?id=${id}`,{} , {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.error('Error deleting plant:', error);
    throw error; 
  }
};