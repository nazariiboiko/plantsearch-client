import axios from 'axios';
import { API_MARKERS } from '../utils/constants';
import { getToken } from './AuthUtils';

export const getAllGroups = async (page = 0, size = 20, sort = 'id') => {
    return await axios
        .get(`${API_MARKERS}?page=${page}&size=${size}`)
        .then((response) => response.data);
};

export const getGroupById = async (id) => {
    return await axios
        .get(`${API_MARKERS}/${id}`)
        .then((response) => response.data);
};

export const saveGroup = async (group, image = null) => {
    const token = getToken();
    const formData = new FormData();

    formData.append('groupDto', new Blob([JSON.stringify(group)], { type: 'application/json' }));
    formData.append('image', image);

    return await axios
        .post(`${API_MARKERS}`, formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
            },
        });
};

export const updateGroup = async (group, image = null) => {
    const token = getToken();
    const formData = new FormData();

    formData.append('groupDto', new Blob([JSON.stringify(group)], { type: 'application/json' }));
    formData.append('image', image);

    return await axios
      .put(`${API_MARKERS}`, formData, {
            headers: {
                Authorization: token,
                'Content-Type':'multipart/form-data',
            },
        });
};

export const deleteGroup = async (id) => {
    const token = getToken();
    return await axios
      .delete(`${API_MARKERS}?groupId=${id}`, {
            headers: {
                Authorization: token,
            }
        });
};
