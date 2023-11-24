import jwt_decode from 'jwt-decode';

export const getRole = () => {
    if (localStorage.getItem('access_token')) {
        const decodedJwt = jwt_decode(localStorage.getItem('access_token'));
        return decodedJwt.role;
    }
    return null;
};

export const getToken = () => {
    return 'Bearer ' + localStorage.getItem('access_token');
};

export const useAuth = () => {
    return !!localStorage.getItem('access_token');
};

export const isToken = () => {
    return !!localStorage.getItem('access_token');
};

export const getName = () => {
    if (isToken())
        return jwt_decode(localStorage.getItem('access_token')).sub;
    else return null;
}

export const logout = () => {
    localStorage.removeItem('access_token');
}