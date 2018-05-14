import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/', // to be changed to /api/ when ruby is wired with react app
  timeout: 15000,
});

export default api;
