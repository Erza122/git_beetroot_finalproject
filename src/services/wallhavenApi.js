import axios from 'axios';

const API_KEY = 'pxZpi3eGmj9Ov6zugdlIVeD8IWG1gwmv';
const BASE_URL = 'https://wallhaven.cc/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY
  }
});

export const searchWallpapers = async (query, filters = {}) => {
  try {
    const params = {
      q: query,
      sorting: filters.sorting || 'relevance',
      order: filters.order || 'desc',
      categories: filters.categories || '111',
      purity: filters.purity || '100',
      page: filters.page || 1
    };

    if (filters.ratios) {
      params.ratios = filters.ratios;
    }

    if (filters.atleast) {
      params.atleast = filters.atleast;
    }

    const response = await api.get('/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching wallpapers:', error);
    throw error;
  }
};

export const getWallpaperDetails = async (id) => {
  try {
    const response = await api.get(`/w/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallpaper details:', error);
    throw error;
  }
};

export const getPopularTags = async () => {
  try {
    const response = await api.get('/search', {
      params: {
        sorting: 'toplist',
        topRange: '1M'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular wallpapers:', error);
    throw error;
  }
};

export default api;
