//handle API requests

import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchUserPosts = async (userId: number) => {
  const response = await axios.get(`${API_URL}/posts`, {
    params: { userId }
  });
  return response.data;
};

export const fetchUser = async (userId: number) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
};