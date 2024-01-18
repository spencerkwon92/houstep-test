import { useState, useCallback, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";

import AppLayout from "../components/AppLayout";
import { OrderListIcon } from "../icons";
import useLoadItems from "../hooks/useLoadItems";
import ItemCard from "../components/orderPage/ItemCard";
import { orderState } from "../recoil";
import { addOrderAPI } from "./api/orders";
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

const headerLink: ReactNode = (
  <Link href="/orderlist">
    <button>
      <OrderListIcon />
    </button>
  </Link>
);

export default function OrderPage() {
  const [{ items }, isLoading, error] = useLoadItems();
  const [{ order }, setOrderState] = useRecoilState(orderState);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const router = useRouter();
  const isOrderReady: boolean = totalPrice > 0 && totalQuantity > 0;

  const onSubmit = useCallback(async () => {
    setOrderLoading(true);
    try {
      await addOrderAPI({ totalPrice, totalQuantity, items: order });
      setOrderState((prev) => ({ ...prev, order: [] }));
      router.push("/complete");
    } catch (err) {
      router.push("/error");
    } finally {
      setOrderLoading(false);
    }
  }, [totalPrice, totalQuantity, order]);

  let state: ReactNode = <></>;
  if (error) {
    state = stateDiv["error"];
  } else if (isLoading) {
    state = stateDiv["loading"];
  }

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader links={headerLink} />
        <PageContent>
          {state}
          {items?.map((item) => (
            <ItemCard
              key={item.id}
              data={item}
              totalQuantitySetter={setTotalQuantity}
              totalPriceSetter={setTotalPrice}
            />
          ))}
        </PageContent>
        <PageFooter>
          <div className="info">
            <div>총 수량 : {totalQuantity}개</div>
            <div>총 가격 : {totalPrice.toLocaleString()}원</div>
          </div>
          <button onClick={onSubmit} disabled={!isOrderReady || orderLoading}>
            {orderLoading ? "로딩중..." : "주문하기"}
          </button>
        </PageFooter>
      </PageContainer>
    </AppLayout>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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

const PageFooter = styled.div`
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
      background-color: black;
    }

    &:disabled {
      background-color: #c1c1c1;
      color: white;
      cursor: not-allowed;
    }
  }
`;
