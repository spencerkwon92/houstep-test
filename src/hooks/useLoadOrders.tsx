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
    let isMounted = true;
    setIsLoading(true);

    loadOrdersAPI()
      .then((data) => {
        if (isMounted) {
          setOrderState((prev) =>
            produce(prev, (draft) => {
              const reverseData = [...data].reverse();
              draft.orders = reverseData;
            })
          );
        }
      })
      .catch((error) => {
        if (isMounted) {
          setError(error);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [setOrderState, loadOrdersAPI]);

  return [orders, isLoading, error];
};

export default useLoadOrders;
