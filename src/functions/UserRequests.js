import axios from "axios";
import { getToken } from "./AuthUtils";
import { API_USERS } from "../utils/constants";

export const getAllUsers = async (page = 0, size = 20, sort = 'id') => {
    try {
    const token = getToken();
    return await axios
    .get(`${API_USERS}?page=${page}&size=${size}`, {
      headers: {
          Authorization: token,
        }
      })
    .then((response) => response.data);
    }
    catch (error) {
        console.error('Error parsing JWT:', error);
        // Handle the error gracefully, e.g., display an error message to the user
    }

}

// export const getAllPlants = async (page = 0, size = 20, sort = 'id') => {
//     return await axios
//         .get(`${API_PLANTS}?page=${page}&size=${size}`)
//         .then((response) => response.data);
// }