import axios from 'axios';

const URL = 'https://first-todo-list-backend.herokuapp.com';

// Para Desenvolvimento do backend utilize esta variável
// const URL = 'http://localhost:4000';

export const initTask = async (id) => {
  const fetchApi = await axios.post(`${URL}/initTask/${id}`);

  return fetchApi;
};

export const doneTask = async (id) => {
  const fetchApi = await axios.post(`${URL}/delete/${id}`);

  return fetchApi;
};

export const addTask = async (data) => {
  const fetchApi = await axios.post(`${URL}/addTask`, data);

  return fetchApi;
};

export const getTasks = async (id) => {
  const fetchApi = await axios.post(`${URL}/tasks`, { id });

  return fetchApi;
};

export const createUser = async (data) => {
  const fetchApi = await axios.post(`${URL}/create`, data);

  return fetchApi;
};

export const login = async (data) => {
  const fetchApi = await axios.post(`${URL}/login`, data);

  return fetchApi;
};
