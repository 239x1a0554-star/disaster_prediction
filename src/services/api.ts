import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const PredictionService = {
  uploadImages: async (preImage: File, postImage: File) => {
    const formData = new FormData();
    formData.append('pre_disaster', preImage);
    formData.append('post_disaster', postImage);
    
    // Placeholder endpoint for FastAPI
    // return api.post('/upload', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    
    return Promise.resolve({ data: { id: 'demo-123', status: 'processing' } });
  },

  getPrediction: async (_id: string) => {
    // return api.get(`/predict/${id}`);
    return Promise.resolve({ data: { status: 'completed' } });
  },

  getHistory: async () => {
    // return api.get('/history');
    return Promise.resolve({ data: [] });
  }
};

export const DashboardService = {
  getStatistics: async () => {
    // return api.get('/statistics');
    return Promise.resolve({ data: {} });
  }
};
