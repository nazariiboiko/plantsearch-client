import { getRole } from '../functions/authUtils';

const AccessRoute = ({ role, to, redirect }) => {
    const roles = getRole();
    return roles === role ? to : redirect;
};

export default AccessRoute;