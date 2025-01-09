import axios from 'axios';

// Basis-URL für das Backend (aus Umgebungsvariablen oder Standardwert)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Interceptor, um den Token automatisch hinzuzufügen
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Token aus localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

