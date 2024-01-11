import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
import { useSetRecoilState } from "recoil";
import { produce } from "immer";

import { Item } from "../../../interfaces/data";
import { orderState } from "../../../recoil";
import { ItemCardContainer, ItemCardContent, Event } from "./ItemCard.styles";

type Props = {
  data: Item;
  totalQuantitySetter: Dispatch<SetStateAction<number>>;
  totalPriceSetter: Dispatch<SetStateAction<number>>;
};

const ItemCard = ({ data, totalQuantitySetter, totalPriceSetter }: Props) => {
  const [quantity, setQuantity] = useState<number>(0);
  const setOrderState = useSetRecoilState(orderState);
  const { id, name, event, price } = data;
  const isEvent: boolean = event === 1;

  const updateOrderState = (newQuantity: number) => {
    setOrderState((prev) =>
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

  const onClickQuantity = useCallback(
    (type: string) => {
      let newQuantity: number = quantity;
      if (type === "up" && quantity < 999) {
        newQuantity = quantity + 1;
        setQuantity((prev) => prev + 1);
        totalQuantitySetter((prev) => prev + 1);
        totalPriceSetter((prev) => prev + price);
      } else if (type === "down" && quantity > 0) {
        newQuantity = quantity - 1;

        setQuantity((prev) => prev - 1);
        totalQuantitySetter((prev) => prev - 1);
        totalPriceSetter((prev) => prev - price);
      }

      updateOrderState(newQuantity);
    },
    [totalQuantitySetter, totalPriceSetter, updateOrderState, price]
  );

  return (
    <ItemCardContainer quantity={quantity}>
      <div className="mockImage" />
      <ItemCardContent>
        <div className="contentHeader">
          <div>{name}</div>
          <div>{isEvent && <EventLabel />}</div>
        </div>

        <div className="calcSection">
          <div className="btnSection">
            <button onClick={() => onClickQuantity("down")}>-</button>
            <div>{quantity}</div>
            <button onClick={() => onClickQuantity("up")}>+</button>
          </div>
          <div>{`${price.toLocaleString()} 원`}</div>
        </div>
      </ItemCardContent>
    </ItemCardContainer>
  );
};

const EventLabel = () => {
  return <Event>이벤트</Event>;
};

export default ItemCard;
