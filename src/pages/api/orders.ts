import axios from "axios";

import { Order } from "../../interfaces/data";

axios.defaults.baseURL = "http://localhost:3001";

export const loadOrdersAPI = () => {
  return axios.get("/orders").then((response) => response.data);
};

export const addOrderAPI = (data: Order) => {
  return axios.post("/orders", data).then((response) => response.data);
};

export const removeOrderAPI = (id: string) => {
  return axios.delete(`/orders/${id}`).then((response) => response.data);
};
