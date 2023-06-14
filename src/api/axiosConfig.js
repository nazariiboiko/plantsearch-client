import axios from 'axios';

export default axios.create({
    baseURL: 'https://0676-31-42-178-59.ngrok-free.app',
    headers: {
        "ngrok-skip-browser-warning": "true",
        'Content-Type': 'application/json',
        
    }
});