import type { NextPage } from "next";
import { css } from "@emotion/react";
import Link from "next/link";

import AppLayout from "../components/AppLayout";
import { BigLogo } from "../icons";

const pageCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: black;
  width: 100%;
  height: 100%;

  button {
    font-size: 25px;
    width: 172px;
    height: 88px;
    border-radius: 20px;
    background-color: #ffffff;
    margin-top: 20px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const Home: NextPage = () => {
  return (
    <AppLayout>
      <div css={pageCss}>
        <BigLogo />
        <Link href="/order">
          <button>주문하러 가기</button>
        </Link>
      </div>
    </AppLayout>
  );
};

export default Home;
