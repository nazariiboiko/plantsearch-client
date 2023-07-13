import api from '../api/axiosConfig';
import {API_FAVOURITE, API_FAVOURITE_LIKE} from '../utils/constants';
import { getToken } from './authUtils';

export const getFavourites = async () => {
    const token = getToken();
    return await api
      .get(`${API_FAVOURITE}/my`, {
          headers: {
              Authorization: token,
            }
          })
      .then((res) => res.data);
  }
  
  export const doLike = async (id) => {
    const token = getToken();
    return await api
      .post(`${API_FAVOURITE_LIKE}?id=${id}`, {}, {
          headers: {
              Authorization: token,
            }
          });
  }