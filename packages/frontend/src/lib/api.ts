import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://dev-board.onrender.com',
    withCredentials: true,
}); 