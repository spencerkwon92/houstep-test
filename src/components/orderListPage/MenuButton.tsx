import React, { useState, useCallback, FunctionComponent } from "react";
import { useSetRecoilState } from "recoil";
import { produce } from "immer";
import styled from "@emotion/styled";

import { MenuIcon } from "../../icons";
import { removeOrderAPI } from "../../pages/api/orders";
import { orderState } from "../../recoil";

type Props = {
  id: string;
};

const MenuButton: FunctionComponent<Props> = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const orderStateSetter = useSetRecoilState(orderState);

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, []);

  const onDelete = useCallback(async () => {
    try {
      await removeOrderAPI(id);
      orderStateSetter((prev) =>
        produce(prev, (draft) => {
          draft.orders = draft.orders.filter((order) => order.id !== id);
        })
      );
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  return (
    <>
      <ModalContainer isModalOpen={isModalOpen}>
        <ModalBody>
          <button onClick={onDelete}>주문내역 삭제</button>
          <button onClick={toggleModal}>닫기</button>
        </ModalBody>
      </ModalContainer>
      <MenuButtonContainer onClick={toggleModal}>
        <MenuIcon />
      </MenuButtonContainer>
    </>
  );
};

export default MenuButton;

const MenuButtonContainer = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  border: none;
  background-color: transparent;
`;

const ModalContainer = styled.dialog<{ isModalOpen: boolean }>`
  position: absolute;
  display: ${({ isModalOpen }) => (isModalOpen ? "flex" : "none")};
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(58, 58, 58, 50%);

  justify-content: center;
  align-items: center;

  border: none;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  background-color: white;
  border-radius: 15px;
  padding: 20px;

  button {
    font-size: 18px;
    width: 301px;
    height: 47.92px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;
