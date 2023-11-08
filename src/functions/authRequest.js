import axios from 'axios';
import { API_AUTHENTICATION } from '../utils/constants';

export const login = (authData) => {
    const headers = {
        'Accept-Language': 'en',
    };

    return axios.post(
        `${API_AUTHENTICATION}/login`,
        authData,
        { headers }
    ).then((response) => {
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
    });
};

export const register = (authData) => {
    const headers = {
        'Accept-Language': 'en',
    };

    return axios.post(
        `${API_AUTHENTICATION}/register`,
        authData,
        { headers }
    ).then((response) => {
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token);
        }
    });
};