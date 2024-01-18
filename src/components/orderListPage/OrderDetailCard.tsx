import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

import { Item } from "../../interfaces/data";

type Prop = {
  itemData: { item: Item; quantity: number };
};

const OrderDetailCard: FunctionComponent<Prop> = ({ itemData }) => {
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

const OrderDetailCardContainer = styled.div`
  display: flex;
  gap: 15px;

  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 12px;

  .imageSection {
    min-width: 62px;
    min-height: 62px;
    background-color: #d9d9d9;
  }
`;
