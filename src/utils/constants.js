export const API = 'http://localhost:8085/api/v1';
export const image_store = 'https://plantsearch.s3.eu-north-1.amazonaws.com'

export const ROLE_USER = 'USER';
export const ROLE_MANAGER = 'MANAGER';
export const ROLE_ADMIN = 'ADMIN';

//AuthController
export const API_AUTHENTICATION = `${API}/auth`;

//UserController
export const API_USERS = `${API}/users`;
export const API_USERS_UPDATE = `${API_USERS}/update`

//PlantController
export const API_PLANTS        = `${API}/plants`;
export const API_PLANTS_RANDOM = `${API_PLANTS}/random`;
export const API_PLANTS_SEARCH = `${API_PLANTS}/search`;
export const API_PLANTS_FILTER = `${API_PLANTS}/filter`;

//SupplierController
export const API_SUPPLIER           = `${API}/suppliers`
export const API_SUPPLIER_UPDATE    = `${API_SUPPLIER}/update`

//FavouriteController
export const API_FAVOURITE          = `${API}/favourites`
export const API_FAVOURITE_LIKE     = `${API_FAVOURITE}/like`