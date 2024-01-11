import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import AppLayout from "../components/AppLayout";
import { CheckIcon } from "../icons";

const componentCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width 100%;
  height: 100%;
  font-size: 18px;
  
`;

function OrderCompletePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/order"), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <AppLayout>
      <div css={componentCss}>
        <CheckIcon />
        <div>주문이 완료되었습니다.</div>
      </div>
    </AppLayout>
  );
}

export default OrderCompletePage;
