import axios from 'axios';
import { API_FAVOURITE } from '../utils/constants';
import { getToken } from './AuthUtils';

export const getFavourites = async () => {
    const token = getToken();
    return await axios
        .get(`${API_FAVOURITE}`, {
            headers: {
                Authorization: token,
            }
        })
        .then((res) => res.data);
}

export const doLike = async (id) => {
    const token = getToken();
    return await axios
        .post(`${API_FAVOURITE}/${id}`, {}, {
            headers: {
                Authorization: token,
            }
        });
}

export const isLikedByUser = async (plantId) => {
    const token = getToken();
    return await axios
        .get(`${API_FAVOURITE}/check/${plantId}`, {
            headers: {
                Authorization: token,
            }
        });
}