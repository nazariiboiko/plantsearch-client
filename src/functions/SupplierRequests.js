import axios from "axios";
import { API_SUPPLIERS } from "../utils/constants";

export const getAllSuppliers = async (page = 0, size = 20) => {
    return await axios
        .get(`${API_SUPPLIERS}?page=${page}&size=${size}`)
        .then((res) => res.data);
}

export const getSupplierById = async (id) => {
    return await axios
        .get(`${API_SUPPLIERS}/${id}`)
        .then((res) => res.data);
}

export const createSupplier = async (name) => {
    return await axios
        .post(`${API_SUPPLIERS}/create`, {name: name})
        .then((res) => res.data);
}

export const findSuppliersByPlantId = async (plantId) => {
    return await axios
        .get(`${API_SUPPLIERS}/find?plantId=${plantId}`)
        .then((res) => res.data);
}

export const addJunction = async (supplierId, plantId) => {
    return await axios
        .post(`${API_SUPPLIERS}/add?supplierId=${supplierId}&plantId=${plantId}`)
        .then((res) => res.data);
}

export const deleteJunction = async (supplierId, plantId) => {
    return await axios
        .post(`${API_SUPPLIERS}/remove?supplierId=${supplierId}&plantId=${plantId}`)
        .then((res) => res.data);
}