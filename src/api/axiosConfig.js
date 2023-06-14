import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8085',
    headers: {
        "ngrok-skip-browser-warning": "true",
        'Content-Type': 'application/json',
        
    }
});