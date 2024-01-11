import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { produce } from "immer";

import { orderState } from "../recoil";
import { loadOrdersAPI } from "../pages/api/orders";
import { Order } from "../interfaces/data";

const useLoadOrders = (): [Order[], boolean, Error | null] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [{ orders }, setOrderState] = useRecoilState(orderState);

  useEffect(() => {
    setIsLoading(true);
    loadOrdersAPI()
      .then((data) =>
        setOrderState((prev) =>
          produce(prev, (draft) => {
            draft.orders = data;
          })
        )
      )
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return [orders, isLoading, error];
};

export default useLoadOrders;
