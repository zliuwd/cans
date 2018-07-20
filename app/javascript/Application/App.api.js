import axios from 'axios';

const appApi = axios.create({
  baseURL: process.env.CANS_BASE_PATH ? process.env.CANS_BASE_PATH + '/api' : '/api',
  timeout: 15000,
});

export default appApi;
