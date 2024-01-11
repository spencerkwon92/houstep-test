import React from "react";
import { css } from "@emotion/react";

import { Item } from "../../../interfaces/data";
import { OrderDetailCardContainer } from "./Components.styles";

type ComponentProp = {
  itemData: { item: Item; quantity: number };
};

const OrderDetailCard = ({ itemData }: ComponentProp) => {
  const { item, quantity } = itemData;
  return (
    <OrderDetailCardContainer>
      <div className="imageSection" />
      <div>
        <div>{item.name}</div>
        <div>자재 단가 : {item.price.toLocaleString()} 원</div>
        <div>구매 수량 : {quantity}개</div>
      </div>
    </OrderDetailCardContainer>
  );
};

export default OrderDetailCard;
