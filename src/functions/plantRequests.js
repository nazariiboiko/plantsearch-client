import api from '../api/axiosConfig';
import { API_PLANTS_RANDOM, API_PLANTS, API_PLANTS_SEARCH } from '../utils/constants';

export const getRandomPlants = async (amount) => {
        return await api
        .get(API_PLANTS_RANDOM + `?amount=${amount}`)
        .then((response) => response.data);
};

export const getPlantById = async (id) => {
    return await api
    .get(`${API_PLANTS}/${id}`)
    .then((response) => response.data);
};

export const getPlantByName = async (name) => {
    return await api
    .get(`${API_PLANTS_SEARCH}?query=${name}`)
    .then((response) => response.data);
}