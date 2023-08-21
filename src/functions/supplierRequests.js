import api from '../api/axiosConfig';
import { API_SUPPLIER } from '../utils/constants';
import { getToken } from './authUtils';

export const getAllSuppliers = async (page = 1, size = 20) => {
    return await api
        .get(`${API_SUPPLIER}?page=${page}&size=${size}`, {})
        .then((response) => response.data);
};

export const getSupplierByid = async (id) => {
    return await api
        .get(`${API_SUPPLIER}/${id}`, {})
        .then((response) => response.data);
};

export const createSupplier = async (name) => {
    const token = getToken();
    return await api
        .post(`${API_SUPPLIER}`, { name: name }, {
            headers: {
                Authorization: token,
            }
        })
        .then((response) => response.data);
}


export const deleteSupplier = async (id) => {
    const token = getToken();
    return await api
        .post(`${API_SUPPLIER}/delete?id=${id}`, {}, {
            headers: {
                Authorization: token,
            }
        })
        .then((response) => response.data);

}

export const getSupplierByPlant = async (plantId) => {
    return await api
        .get(`${API_SUPPLIER}/find/?plantId=${plantId}`, {})
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