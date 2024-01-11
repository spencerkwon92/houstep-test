export interface Item {
  id: string;
  name: string;
  event: number;
  materialType: number;
  price: number;
}

export interface ItemState {
  items: Item[];
}

export interface Order {
  id?: string;
  totalPrice: number;
  totalQuantity: number;
  items: { item: Item; quantity: number }[];
}
