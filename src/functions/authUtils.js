import jwt_decode from 'jwt-decode';

export const getRole = () => {
    if (localStorage.getItem('jwt-token')) {
        const decodedJwt = jwt_decode(localStorage.getItem('jwt-token'));
        return decodedJwt.role;
    }
    return null;
};

export const getToken = () => {
    return 'Bearer ' + JSON.parse(localStorage.getItem('jwt-token'));
};

export const useAuth = () => {
    return !!localStorage.getItem('jwt-token');
};

export const isToken = () => {
    return !!localStorage.getItem('jwt-token');
};

export const getName = () => {
    if(isToken())
        return jwt_decode(localStorage.getItem('jwt-token')).sub;
    else return null;
}