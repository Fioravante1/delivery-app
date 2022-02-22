import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export async function getAll(url) {
  const { data } = await axiosInstance.get(url);
  return data;
}

export async function postAll(url, object, token) {
  const { data } = await axiosInstance.post(url, object, token);
  return data;
}

export async function edit(url, id) {
  const { data } = await axiosInstance.put(url, id);
  return data;
}
