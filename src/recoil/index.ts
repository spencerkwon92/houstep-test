import { atom } from "recoil";
import { Item, Order } from "../interfaces/data";

export type ItemState = {
  items: Item[];
};

export type OrderState = {
  orders: Order[];
  order: { item: Item; quantity: number }[];
};

export const itemState = atom<ItemState>({
  key: "items",
  default: {
    items: [],
  },
});

export const orderState = atom<OrderState>({
  key: "orders",
  default: {
    orders: [],
    order: [],
  },
});
