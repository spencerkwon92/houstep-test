import React, { ReactNode } from "react";
import Link from "next/link";

import AppLayout from "../components/AppLayout";
import useLoadOrders from "../hooks/useLoadOrders";
import OrderCard from "../components/orderListPage/OrderCard";
import styled from "@emotion/styled";
import PageHeader from "../components/PageHeader";

type StateDivType = Record<"error" | "loading", ReactNode>;

const stateDiv: StateDivType = {
  loading: (
    <div id="eventContent">
      <p>
        목록을
        <br />
        불러오고 있습니다.
      </p>
    </div>
  ),
  error: (
    <div id="eventContent">
      <p>목록을 불러오지 못했습니다.</p>
    </div>
  ),
};

export default function OrderListPage() {
  const [orders, isLoading, error] = useLoadOrders();

  let state: ReactNode = <></>;
  if (error) {
    state = stateDiv["error"];
  } else if (isLoading) {
    state = stateDiv["loading"];
  }

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader />
        <PageContent>
          {state}
          {orders?.map((order) => (
            <OrderCard key={order.id} orderData={order} />
          ))}
        </PageContent>

        <PageFooter>
          <Link href="/order">
            <button>주문하러 가기</button>
          </Link>
        </PageFooter>
      </PageContainer>
    </AppLayout>
  );
}

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 20px;

  overflow-y: hidden;
  padding: 25px 0px;

  &:hover {
    overflow-y: auto;
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

export const PageFooter = styled.div`
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
      background-color: black;
    }

    &:disabled {
      background-color: #c1c1c1;
      color: white;
      cursor: not-allowed;
    }
  }
`;
