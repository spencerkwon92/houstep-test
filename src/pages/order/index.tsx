import React, { useState, useCallback } from "react";
import { css } from "@emotion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import AppLayout from "../../components/AppLayout";
import { SmallLogo, OrderListIcon } from "../../icons";
import useLoadItems from "../../hooks/useLoadItems";
import ItemCard from "./components/ItemCard";
import { orderState } from "../../recoil";
import { addOrderAPI } from "../api/orders";

const pageCss = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 57px;
    background-color: black;
    padding: 13px 12px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .orderInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 22px;
    padding: 20px;
    height: 170px;

    border-radius: 20px 20px 0px 0px;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.25);

    font-size: 18px;
    background-color: white;

    .info {
      width: 301px;
      text-align: right;
    }

    button {
      font-size: 18px;
      width: 301px;
      height: 47.92px;
      color: white;
      background-color: #c1c1c1;
      border: none;

      &:hover {
        cursor: pointer;
        background-color: black;
      }

      &:disabled {
        background-color: #c1c1c1;
        color: white;
        cursor: not-allowed;
      }
    }
  }
`;

const orderContentCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  gap: 20px;

  overflow-y: hidden;
  padding: 25px 0px;
  &:hover {
    overflow-y: scroll;
  }

  #eventContent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    text-align: center;
    font-size: 18px;
  }
`;

function OrderPage() {
  const [{ items }, isLoading, error] = useLoadItems();
  const { order } = useRecoilValue(orderState);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const router = useRouter();
  const isOrderReady: boolean = totalPrice > 0 && totalQuantity > 0;

  const onSubmit = useCallback(() => {
    setOrderLoading(true);
    const data = {
      totalPrice,
      totalQuantity,
      items: order,
    };

    addOrderAPI(data)
      .then((res) => router.push("/complete"))
      .catch((err) => router.push("/error"))
      .finally(() => setOrderLoading(false));
  }, [order, totalPrice, totalQuantity]);

  return (
    <AppLayout>
      <div css={pageCss}>
        <div className="header">
          <Link href="/">
            <SmallLogo />
          </Link>
          <Link href="/orderlist">
            <button>
              <OrderListIcon />
            </button>
          </Link>
        </div>
        <div css={orderContentCss}>
          {error && (
            <div id="eventContent">
              <p>목록을 불러오지 못했습니다.</p>
            </div>
          )}
          {isLoading ? (
            <div id="eventContent">
              <p>
                목록을
                <br />
                불러오고 있습니다.
              </p>
            </div>
          ) : (
            items?.map((item) => (
              <ItemCard
                key={item.id}
                data={item}
                totalQuantitySetter={setTotalQuantity}
                totalPriceSetter={setTotalPrice}
              />
            ))
          )}
        </div>

        <div className="orderInfo">
          <div className="info">
            <div>총 수량 : {totalQuantity}개</div>
            <div>총 가격 : {totalPrice.toLocaleString()}원</div>
          </div>
          <button onClick={onSubmit} disabled={!isOrderReady}>
            {orderLoading ? "로딩중..." : "주문하기"}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}

export default OrderPage;
