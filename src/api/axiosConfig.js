import axios from 'axios';

export default axios.create({
    baseURL: 'https://5334-31-42-178-88.ngrok-free.app',
    headers: {
        "ngrok-skip-browser-warning": "true",
        'Content-Type': 'application/json',
        
    }
});