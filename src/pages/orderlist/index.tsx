import React, { useState, Dispatch, SetStateAction } from "react";
import { css } from "@emotion/react";
import Link from "next/link";

import AppLayout from "../../components/AppLayout";
import { SmallLogo } from "../../icons";
import useLoadOrders from "../../hooks/useLoadOrders";
import OrderCard from "./components/OrderCard";

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
    height: 60px;

    border-radius: 20px 20px 0px 0px;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.25);

    font-size: 18px;
    background-color: white;

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
  flex-grow: 1;
  gap: 20px;

  overflow-y: hidden;
  padding: 25px 0px;
  &:hover {
    overflow-y: scroll;
  }

  #eventContent {
    width: 221px;
    text-align: center;
    font-size: 18px;
  }
`;

function OrderListPage() {
  const [orders, isLoading, error] = useLoadOrders();

  return (
    <AppLayout>
      <div css={pageCss}>
        <div className="header">
          <Link href="/">
            <SmallLogo />
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
            orders?.map((order) => (
              <OrderCard key={order.id} orderData={order} />
            ))
          )}
        </div>

        <div className="orderInfo">
          <Link href="/order">
            <button>주문하러 가기</button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}

export default OrderListPage;
