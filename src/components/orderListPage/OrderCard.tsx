import { FunctionComponent } from "react";

import { Order } from "../../interfaces/data";
import OrderDetailCard from "./OrderDetailCard";
import MenuButton from "./MenuButton";
import styled from "@emotion/styled";

type Props = {
  orderData: Order;
};

const OrderCard: FunctionComponent<Props> = ({ orderData }) => {
  const { id, totalPrice, totalQuantity, items } = orderData;

  return (
    <OrderCardContainer>
      <div className="totalInfoSection">
        <div>
          <div>총 주문 수량 : {totalQuantity}개</div>
          <div>총 주문 금액 : {totalPrice.toLocaleString()}원</div>
        </div>
        <MenuButton id={id || ""} />
      </div>

      {items.map((element) => (
        <OrderDetailCard key={element.item.id} itemData={element} />
      ))}
    </OrderCardContainer>
  );
};

export default OrderCard;

const OrderCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  border: 1px solid #eeeeee;
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  width: 300px;
  padding: 12px;
  font-size: 18px;

  .totalInfoSection {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
