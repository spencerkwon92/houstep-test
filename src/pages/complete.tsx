import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

import AppLayout from "../components/AppLayout";
import { CheckIcon } from "../icons";

export default function OrderCompletePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/order"), 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <AppLayout>
      <PageContainer>
        <CheckIcon />
        <div>주문이 완료되었습니다.</div>
      </PageContainer>
    </AppLayout>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  font-size: 18px;
`;
