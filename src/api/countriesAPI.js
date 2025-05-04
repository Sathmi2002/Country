import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

// Fetch all countries with specific fields
export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all?fields=name,capital,population,region,flags,cca3,languages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

// Search countries by name
export const searchCountriesByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}?fields=name,capital,population,region,flags,cca3,languages`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error('Error searching countries by name:', error);
    throw error;
  }
};

// Filter countries by region
export const getCountriesByRegion = async (region) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}?fields=name,capital,population,region,flags,cca3,languages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    throw error;
  }
};

// Get country details by code
export const getCountryByCode = async (code) => {
  try {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`);
    return response.data[0];
  } catch (error) {
    console.error('Error fetching country by code:', error);
    throw error;
  }
};