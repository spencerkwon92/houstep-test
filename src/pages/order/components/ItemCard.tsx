import React, { useState, useCallback, Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { produce } from "immer";

import { Item } from "../../../interfaces/data";
import { orderState } from "../../../recoil";

const componentCss = (quantity: number) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;

  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  box-sizing: border-box;
  width: 300px;
  min-height: 80px;
  background-color: ${quantity === 0 ? "white" : "rgba(247, 90, 47, 0.1)"};
  padding: 0px 12px;

  .mockImage {
    min-width: 62px;
    min-height: 62px;
    background-color: #d9d9d9;
  }
  button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    width: 19px;
    height: 22px;
  }
`;

const cardContentCss = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  font-size: 18px;

  .contentHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .calcSection {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .btnSection {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      button {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

const eventCss = css`
  width: 53px;
  height: 23px;
  border-radius: 10px;
  background-color: #f75a2f;
  color: white;
  font-size: 13px;
  text-align: center;
  line-height: 23px;
`;

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

  const onClickQuantity = useCallback(
    (type: string) => {
      let newQuantity: number = quantity;
      if (type === "up") {
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

      if (newQuantity > 0) {
        setOrderState((prev) =>
          produce(prev, (draft) => {
            const target = draft.order.find((ele) => ele.item.id === id);

            if (!target) {
              const order = {
                item: data,
                quantity: newQuantity,
              };
              draft.order = [...draft.order, order];
            } else {
              target.quantity = newQuantity;
            }
          })
        );
      } else {
        setOrderState((prev) =>
          produce(prev, (draft) => {
            const target = draft.order.find((ele) => ele.item.id === id);

            if (target) {
              draft.order = draft.order.filter((ele) => ele.item.id !== id);
            }
          })
        );
      }
    },
    [quantity]
  );

  return (
    <div css={componentCss(quantity)}>
      <div className="mockImage" />
      <div css={cardContentCss}>
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
      </div>
    </div>
  );
};

const EventLabel = () => {
  return <div css={eventCss}>이벤트</div>;
};

export default ItemCard;
