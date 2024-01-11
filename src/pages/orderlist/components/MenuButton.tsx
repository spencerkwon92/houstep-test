import React, { useState, useCallback } from "react";
import { css } from "@emotion/react";
import { useSetRecoilState } from "recoil";
import { produce } from "immer";

import { MenuIcon } from "../../../icons";
import { removeOrderAPI } from "../../api/orders";
import { orderState } from "../../../recoil";

const componentCss = css`
  display: flex;
  align-items: center;
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const dialogCss = (isModalOpen: boolean) => css`
  position: absolute;
  display: ${isModalOpen ? "flex" : "none"};
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(58, 58, 58, 50%);

  justify-content: center;
  align-items: center;

  border: none;

  .modalBody {
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
  }
`;

const MenuButton = ({ id }: { id: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const orderStateSetter = useSetRecoilState(orderState);

  const onClickButton = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, [isModalOpen]);

  const onClose = useCallback(() => {
    setIsModalOpen((prev) => !prev);
  }, [isModalOpen]);

  const onDelete = useCallback(() => {
    if (id) {
      removeOrderAPI(id)
        .then((res) =>
          orderStateSetter((prev) =>
            produce(prev, (draft) => {
              draft.orders = draft.orders.filter((order) => order.id !== id);
            })
          )
        )
        .catch((err) => {
          console.error(err);
          alert("주문내역 삭제에 실패했습니다.");
        });
      setIsModalOpen((prev) => !prev);
    }
  }, [id]);

  return (
    <>
      <dialog css={dialogCss(isModalOpen)}>
        <div className="modalBody">
          <button onClick={onDelete}>주문내역 삭제</button>
          <button onClick={onClose}>닫기</button>
        </div>
      </dialog>
      <button css={componentCss} onClick={onClickButton}>
        <MenuIcon />
      </button>
    </>
  );
};

export default MenuButton;
