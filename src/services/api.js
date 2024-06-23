import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const fetchUsers = async () => {
  const response = await apiClient.get('/user');
  return response.data.map(user => ({
    ...user,
    image: `data:image/jpeg;base64,${user.image}`
  })).sort((a, b) => b.id - a.id);
};

export const createUser = async (formData) => {
  const response = await apiClient.post('/user', formData);
  return response.data;
};
