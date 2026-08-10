import axios from 'axios';
import { BASE_URL } from './config';

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach the session token (set on login) to every request.
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('hmms_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// A rejected/expired token means the session is no longer valid client-side too.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
