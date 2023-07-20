import api from '../api/axiosConfig';
import { API_SUPPLIER, API_SUPPLIER_UPDATE } from '../utils/constants';
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
};

export const getSupplierByid = async (id) => {
    const token = getToken();
    return await api
        .get(`${API_SUPPLIER}/${id}`, {
            headers: {
                Authorization: token,
            }
        })
        .then((response) => response.data);
};

export const deleteJunction = async (supId, plantId) => {
    const token = getToken();
    return await api
        .post(`${API_SUPPLIER}/plant/delete?supplierId=${supId}&plantId=${plantId}`, {}, {
            headers: {
                Authorization: token,
            }
        })
        .then((response) => response.data);
};

export const createJunction = async (supId, plantId) => {
    const token = getToken();
    return await api
        .post(`${API_SUPPLIER}/plant/create?supplierId=${supId}&plantId=${plantId}`, {}, {
            headers: {
                Authorization: token,
            }
        })
        .then((response) => response.data);
}