import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { useRouter } from "next/router";

import AppLayout from "../components/AppLayout";

const componentCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width 100%;
  height: 100%;
  font-size: 18px;
  Text-align: center;
  
`;

function OrderErrorPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/order"), 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <AppLayout>
      <div css={componentCss}>
        <p>
          주문에 실패하였습니다.
          <br />
          다시 시도해주세요.
        </p>
      </div>
    </AppLayout>
  );
}

export default OrderErrorPage;
