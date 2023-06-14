import axios from 'axios';
import { API_AUTHENTICATION } from '../utils/constants.js';

export const doLogin = (userData) => {
    return axios
        .post(API_AUTHENTICATION + '/login', userData)
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem(
                    'jwt-token',
                    JSON.stringify(response.data.token)
                );
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('jwt-token');
};

export const doSignup = (userData) => {
    return axios
        .post(API_AUTHENTICATION + '/register', userData)
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem(
                    'jwt-token',
                    JSON.stringify(response.data.token)
                );
            }
            return response.data;
        });
};
