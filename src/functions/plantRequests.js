import api from '../api/axiosConfig';
import { API_PLANTS_RANDOM, API_PLANTS, API_PLANTS_SEARCH, API_PLANTS_FILTER } from '../utils/constants';
import { getToken } from './authUtils';


export const getRandomPlants = async (amount) => {
        return await api
        .get(API_PLANTS_RANDOM + `?amount=${amount}`)
        .then((response) => response.data);
};

export const getAllPlants = async (page, size) => {
    return await api
    .get(`${API_PLANTS}`, {page: page, size: size})
    .then((response) => response.data);
}

export const getPlantById = async (id) => {
    return await api
    .get(`${API_PLANTS}/${id}`)
    .then((response) => response.data);
};

export const getPlantByName = async (name) => {
    return await api
    .get(`${API_PLANTS_SEARCH}?query=${name}`)
    .then((response) => response.data);
};

export const getPlantsByCriterias = async (selectedCriteria, page, size) => {
      return await api
      .post(`${API_PLANTS_FILTER}`, {params: selectedCriteria, page: page, size: size})
      .then((response) =>response.data);
};

export const updatePlant = async (plant) => {
    try {
      const token = getToken();
      const response = await api.post(`${API_PLANTS}/update`, plant, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating plant:', error);
      throw error; 
    }
  }