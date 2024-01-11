import type { NextPage } from "next";
import styled from "@emotion/styled";
import Link from "next/link";

import AppLayout from "../components/AppLayout";
import { BigLogo } from "../icons";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: black;
  width: 100%;
  height: 100%;
`;

const OrderButton = styled.button`
  font-size: 25px;
  width: 172px;
  height: 88px;
  border-radius: 20px;
  background-color: #ffffff;
  margin-top: 20px;
`;

const Home: NextPage = () => {
  return (
    <AppLayout>
      <PageContainer>
        <BigLogo />
        <Link href="/order" passHref>
          <OrderButton>주문하러 가기</OrderButton>
        </Link>
      </PageContainer>
    </AppLayout>
  );
};

export default Home;
