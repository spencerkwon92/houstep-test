import { Order } from "../../../interfaces/data";
import OrderDetailCard from "./OrderDetailCard";
import MenuButton from "./MenuButton";
import { OrderCardContainer } from "./Components.styles";

type ComponentProp = {
  orderData: Order;
};

const OrderCard = ({ orderData }: ComponentProp) => {
  const { id, totalPrice, totalQuantity, items } = orderData;

  return (
    <OrderCardContainer>
      <div className="totalInfoSection">
        <div>
          <div>총 주문 수량 : {totalQuantity}개</div>
          <div>총 주문 금액 : {totalPrice.toLocaleString()}원</div>
        </div>
        <MenuButton id={id || ""} />
      </div>

      {items.map((element) => (
        <OrderDetailCard key={element.item.id} itemData={element} />
      ))}
    </OrderCardContainer>
  );
};

export default OrderCard;
