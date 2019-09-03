import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.meetapp.matgsan.dev',
});

export default api;
