// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Adjust according to your backend URL
  withCredentials: true, // To handle cookies for sessions
});

export const getPlaces = async (lat, lon, radius = 2000, categories = { catering: true, commercial: true, production: true, service: true, office: true }) => {
  const response = await api.get('/get_places', {
    params: { 
      lat, 
      lon, 
      radius,
      catering: categories.catering,
      commercial: categories.commercial,
      production: categories.production,
      service: categories.service,
      office: categories.office
    },
  });
  return response.data;
};

export const getSolarData = async (lat, lon) => {
  const response = await api.get('/get_solar', {
    params: { lat, lon },
  });
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await api.post('/login', { username, password });
  return response.data;
};

export const registerUser = async (username, password) => {
  const response = await api.post('/register', { username, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.get('/logout');
  return response.data;
};
