// export const API = 'http://localhost:8085/api/v1';
export const API ='https://plantsearch.up.railway.app/api/v1';
export const image_store = process.env.REACT_APP_IMAGE_STORE;
//export const site_key = '6LcIeMYnAAAAANaubBwRBLiq-p8k9NL8j4dBxHdd'; dev-key
export const site_key = process.env.REACT_APP_SITE_KEY;

export const ROLE_USER = 'USER';
export const ROLE_ADMIN = 'ADMIN';

export const API_AUTHENTICATION = `${API}/auth`;
export const API_USERS          = `${API}/users`;
export const API_PLANTS         = `${API}/plants`;
export const API_FAVOURITE      = `${API}/favourites`;
export const API_SUPPLIERS      = `${API}/suppliers`;
export const API_MARKERS        = `${API}/markers`;