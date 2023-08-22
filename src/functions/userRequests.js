import api from '../api/axiosConfig';
import {API_USERS, API_USERS_UPDATE } from '../utils/constants';
import { getToken } from './authUtils';

export const getAllUsers = async (page = 1, size = 20) => {
  const token = getToken();
    return await api
    .get(`${API_USERS}?page=${page}&size=${size}`, {
      headers: {
          Authorization: token,
        }
      })
    .then((response) => response.data);
}

export const getUserById = async (id) => {
  const token = getToken();
    return await api
    .get(`${API_USERS}/id/${id}`, {
      headers: {
          Authorization: token,
        },
  })
    .then((res) => res.data);
}

export const updateUser = async (user) => {
    const token = getToken();
    return await api
    .post(`${API_USERS_UPDATE}`, user, {
        headers: {
            Authorization: token,
          },
    });
}

export const blockUser = async (id, status) => {
    const token = getToken();
    return await api
    .post(`${API_USERS}/status?id=${id}&status=${status}`,
      {},
      {
        headers: {
            Authorization: token,
          },
        });
}