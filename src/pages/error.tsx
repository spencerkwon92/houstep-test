import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import AppLayout from "../components/AppLayout";

export default function OrderErrorPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/order"), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppLayout>
      <PageContainer>
        <p>
          주문에 실패하였습니다.
          <br />
          다시 시도해주세요.
        </p>
      </PageContainer>
    </AppLayout>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
  text-align: center;
`;
