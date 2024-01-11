import Link from "next/link";

import AppLayout from "../../components/AppLayout";
import { SmallLogo } from "../../icons";
import useLoadOrders from "../../hooks/useLoadOrders";
import OrderCard from "./components/OrderCard";
import {
  PageContainer,
  PageContent,
  PageFooter,
  PageHeader,
} from "./OrderListPage.styles";

function OrderListPage() {
  const [orders, isLoading, error] = useLoadOrders();

  return (
    <AppLayout>
      <PageContainer>
        <PageHeader>
          <Link href="/">
            <SmallLogo />
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
            orders?.map((order) => (
              <OrderCard key={order.id} orderData={order} />
            ))
          )}
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

export default OrderListPage;
