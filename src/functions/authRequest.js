import axios from 'axios';
import { API_AUTHENTICATION } from '../utils/constants.js';

export const doLogin = (userData, lang) => {
    return axios.post(API_AUTHENTICATION + '/login', userData, {
        params: {
            lang: lang || 'en',
        },
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('jwt-token', JSON.stringify(response.data.token));
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('jwt-token');
};

export const doSignup = (userData, lang) => {
    return axios
        .post(API_AUTHENTICATION + '/register', userData, {
            params: {
                lang: lang || 'en',
            },
        })
        .then((response) => {
            return response.data;
        });
};

export const activateAccount = (userData, code, lang) => {
    return axios
        .post(API_AUTHENTICATION + '/activate', userData, {
            params: {
                code: code,
                lang: lang || 'en',
            }
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem(
                    'jwt-token',
                    JSON.stringify(response.data.token)
                );
            }
            return response.data;
        });
}
