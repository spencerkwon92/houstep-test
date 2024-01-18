import React, {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  FunctionComponent,
} from "react";
import { useSetRecoilState } from "recoil";
import styled from "@emotion/styled";

import { Item } from "../../interfaces/data";
import { orderState } from "../../recoil";
import updateOrderState from "../../utils/updateOrderState";

type Props = {
  data: Item;
  totalQuantitySetter: Dispatch<SetStateAction<number>>;
  totalPriceSetter: Dispatch<SetStateAction<number>>;
};

const ItemCard: FunctionComponent<Props> = ({
  data,
  totalQuantitySetter,
  totalPriceSetter,
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  const setOrderState = useSetRecoilState(orderState);
  const { id, name, event, price } = data;
  const isEvent: boolean = event === 1;

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
      updateOrderState(newQuantity, data, id, setOrderState);
    },
    [price, quantity]
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

const ItemCardContainer = styled.div<{ quantity: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;

  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  box-sizing: border-box;
  width: 300px;
  min-height: 80px;
  padding: 0px 12px;
  background-color: ${({ quantity }) =>
    quantity === 0 ? "white" : "rgba(247, 90, 47, 0.1)"};

  .mockImage {
    min-width: 62px;
    min-height: 62px;
    background-color: #d9d9d9;
  }
`;

const ItemCardContent = styled.div`
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
      justify-content: center;
      gap: 10px;
      font-size: 18px;
      button {
        font-size: 18px;
      }
    }
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

const Event = styled.div`
  width: 53px;
  height: 23px;
  border-radius: 10px;
  background-color: #f75a2f;
  color: white;
  font-size: 13px;
  text-align: center;
  line-height: 23px;
`;
