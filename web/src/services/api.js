import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.meetapp.matgsan.me',
});

export default api;
