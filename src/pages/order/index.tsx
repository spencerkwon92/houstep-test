import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";

import AppLayout from "../../components/AppLayout";
import { SmallLogo, OrderListIcon } from "../../icons";
import useLoadItems from "../../hooks/useLoadItems";
import ItemCard from "./components/ItemCard";
import { orderState } from "../../recoil";
import { addOrderAPI } from "../api/orders";
import {
  PageContainer,
  PageHeader,
  PageFooter,
  PageContent,
} from "./OrderPage.styles";

function OrderPage() {
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
  }, [router, totalPrice, totalQuantity, order]);

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader>
          <Link href="/" legacyBehavior>
            <a>
              <SmallLogo />
            </a>
          </Link>
          <Link href="/orderlist">
            <button>
              <OrderListIcon />
            </button>
          </Link>
        </PageHeader>
        <PageContent>
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

export default OrderPage;
