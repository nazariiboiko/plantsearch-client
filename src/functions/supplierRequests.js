import api from '../api/axiosConfig';
import {API_SUPPLIER, API_SUPPLIER_UPDATE } from '../utils/constants';
import { getToken } from './authUtils';

export const getAllSuppliers = async () => {
    return await api
    .get(`${API_SUPPLIER}`)
    .then((response) => response.data);
}