import { produce } from "immer";
import { SetterOrUpdater } from "recoil";
import { OrderState } from "../recoil";
import { Item } from "../interfaces/data";

type FuncType = (
  newQuantity: number,
  data: Item,
  id: string,
  stateSetter: SetterOrUpdater<OrderState>
) => void;

const updateOrderState: FuncType = (newQuantity, data, id, stateSetter) => {
  stateSetter((prev) =>
    produce(prev, (draft) => {
      const target = draft.order.find((ele) => ele.item.id === id);
      if (newQuantity > 0) {
        if (target) {
          target.quantity = newQuantity;
        } else {
          draft.order.push({ item: data, quantity: newQuantity });
        }
      } else if (target) {
        draft.order = draft.order.filter((ele) => ele.item.id !== id);
      }
    })
  );
};

export default updateOrderState;
