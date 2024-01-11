import React, { useState, useCallback } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { produce } from "immer";

import { MenuIcon } from "../../../icons";
import { removeOrderAPI } from "../../api/orders";
import { orderState } from "../../../recoil";
import {
  MenuButtonContainer,
  ModalBody,
  ModalContainer,
} from "./Components.styles";

const MenuButton = ({ id }: { id: string }) => {
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
  }, [id, orderStateSetter]);

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
