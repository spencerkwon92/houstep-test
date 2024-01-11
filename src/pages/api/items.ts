import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export const loadItemsAPI = () => {
  return axios.get("/items").then((response) => response.data);
};

export const loadItemAPI = (id: string) => {
  return axios.get(`/items/${id}`).then((response) => response.data);
};
