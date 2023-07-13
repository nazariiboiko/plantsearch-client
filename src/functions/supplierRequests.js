import api from '../api/axiosConfig';
import {API_SUPPLIER, API_SUPPLIER_UPDATE } from '../utils/constants';
import { getToken } from './authUtils';

export const getAllSuppliers = async (page = 1, size = 20) => {
    const token = getToken();
    return await api
    .get(`${API_SUPPLIER}?page=${page}&size=${size}`, {
        headers: {
            Authorization: token,
          }
        })
    .then((response) => response.data);
}

export const getSupplierByid = async (id) => {
    const token = getToken();
    return await api
    .get(`${API_SUPPLIER}/${id}`, {
        headers: {
            Authorization: token,
          }
        })
    .then((response) => response.data);
}