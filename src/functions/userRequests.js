import api from '../api/axiosConfig';
import {API_USERS, API_USERS_UPDATE } from '../utils/constants';
import { getToken } from './authUtils';

export const getAllUsers = async () => {
    return await api
    .get(`${API_USERS}`)
    .then((response) => response.data);
}

export const getUserById = async (id) => {
    return await api
    .get(`${API_USERS}/${id}`)
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

export const getFavourites = async () => {
  const token = getToken();
  return await api
    .get(`${API_USERS}/favourite`, {
        headers: {
            Authorization: token,
          }
        })
    .then((res) => res.data);
}

export const doLike = async (id) => {
  const token = getToken();
  return await api
    .post(`${API_USERS}/like?id=${id}`, {}, {
        headers: {
            Authorization: token,
          }
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