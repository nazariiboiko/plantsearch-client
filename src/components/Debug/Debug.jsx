import { useAuth, getRole, getToken, getName, isToken } from '../../functions/authUtils';

const Debug = () => {
    return (
        <div>
            <h3>Debug:</h3>
            <hr></hr>
            <p>Your token: {getToken()}</p>
            <p>Is auth: {String(useAuth())}</p>
            <p>Your name: {String(getName())}</p>
            <p>Your role: {String(getRole())}</p>
            <hr></hr>
        </div>
    );
};

export default Debug;