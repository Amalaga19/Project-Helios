// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL:'https://barter-corporateproject.ew.r.appspot.com', // Adjust according to your backend URL
  withCredentials: true, // To handle cookies for sessions
});

export const getPlaces = async (lat, lon, categories = { catering: true, commercial: true, production: true, service: true, office: true }) => {
  const response = await api.get('/get_places', {
    params: { 
      lat, 
      lon, 
      catering: categories.catering ? "1" : "0",
      commercial: categories.commercial ? "1" : "0",
      production: categories.production ? "1" : "0",
      service: categories.service ? "1" : "0",
      office: categories.office ? "1" : "0",
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