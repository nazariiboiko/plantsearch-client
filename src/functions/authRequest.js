import axios from 'axios';
import { API_AUTHENTICATION } from '../utils/constants.js';

export const doLogin = (userData) => {
    return axios
        .post(API_AUTHENTICATION + '/login', userData)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem(
                    'jwt-token',
                    JSON.stringify(response.data.accessToken)
                );
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('jwt-token');
};

export const signup = (userData) => {
    return axios
        .post(API_AUTHENTICATION + '/signup', userData)
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem(
                    'jwt-token',
                    JSON.stringify(response.data.accessToken)
                );
            }
            return response.data;
        });
};
