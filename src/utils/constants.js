export const API = 'http://localhost:8085';

export const ROLE_USER = 'USER';
export const ROLE_MANAGER = 'MANAGER';
export const ROLE_ADMIN = 'ADMIN';

//AuthController
export const API_AUTHENTICATION = `${API}/api/auth`;

//UserController
export const API_USERS = `${API}/api/users`;
export const API_USERS_UPDATE = `${API_USERS}/update`

//PlantController
export const API_PLANTS        = `${API}/api/plants`;
export const API_PLANTS_RANDOM = `${API_PLANTS}/random`;
export const API_PLANTS_SEARCH = `${API_PLANTS}/search`;
export const API_PLANTS_FILTER = `${API_PLANTS}/filter`;

//SupplierController
export const API_SUPPLIER           = `${API}/api/suppliers`
export const API_SUPPLIER_UPDATE    = `${API_SUPPLIER}/update`