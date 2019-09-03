import axios from 'axios';

const api = axios.create({
  baseURL: 'https://matgsan-meetapp-backend.herokuapp.com',
});

export default api;
