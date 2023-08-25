import axios from 'axios';
import { API_AUTHENTICATION } from '../utils/constants.js';

export const doLogin = (userData, lang) => {
    return axios.post(API_AUTHENTICATION + '/login', userData, {
        params: {
            lang: lang || 'en',
        },
    })
        .then((response) => {
            if (response.data.access_token) {
                console.info(response.data.access_token);
                localStorage.setItem('jwt-token', JSON.stringify(response.data.access_token));
            }
            if (response.data.refresh_token) {
                localStorage.setItem('refresh_token', JSON.stringify(response.data.refresh_token));
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('refresh_token');
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
            if (response.data.access_token) {
                console.info(response.data.access_token);
                localStorage.setItem('jwt-token', JSON.stringify(response.data.access_token));
            }
            if (response.data.refresh_token) {
                localStorage.setItem('refresh_token', JSON.stringify(response.data.refresh_token));
            }
            return response.data;
        });
}

export const renewAccessToken = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if(refreshToken) {
        return axios
        .post(API_AUTHENTICATION + '/refresh', {refreshToken: refreshToken}, {})
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem('jwt-token', JSON.stringify(response.data.access_token));
            }
            if (response.data.refresh_token) {
                localStorage.setItem('refresh_token', JSON.stringify(response.data.refresh_token));
            }
            return response.data;
        })
    }
    return null;
}
