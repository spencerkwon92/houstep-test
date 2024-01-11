import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { produce } from "immer";

import { itemState } from "../recoil";
import { loadItemsAPI } from "../pages/api/items";
import { ItemState } from "../interfaces/data";

const useLoadItems = (): [ItemState, boolean, Error | null] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [items, setItems] = useRecoilState(itemState);

  useEffect(() => {
    setIsLoading(true);
    loadItemsAPI()
      .then((data) =>
        setItems((prev) =>
          produce(prev, (draft) => {
            draft.items = data;
          })
        )
      )
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  return [items, isLoading, error];
};

export default useLoadItems;
