import axios from 'axios';

const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;
const axiosInstance = axios.create({
  baseURL
  // You can add other configuration options here if needed
});

export default axiosInstance;
