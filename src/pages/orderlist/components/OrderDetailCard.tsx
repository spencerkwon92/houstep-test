import React from "react";
import { css } from "@emotion/react";

import { Item } from "../../../interfaces/data";

type ComponentProp = {
  itemData: { item: Item; quantity: number };
};

const componentCss = css`
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

const OrderDetailCard = ({ itemData }: ComponentProp) => {
  const { item, quantity } = itemData;
  return (
    <div css={componentCss}>
      <div className="imageSection" />
      <div>
        <div>{item.name}</div>
        <div>제품 단가 : {item.price.toLocaleString()} 원</div>
        <div>구매 수량 : {quantity}개</div>
      </div>
    </div>
  );
};

export default OrderDetailCard;
