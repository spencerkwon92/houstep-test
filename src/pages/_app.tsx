import type { AppProps } from "next/app";
import { css, Global } from "@emotion/react";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Global styles={globalCss} />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

const globalCss = css`
  html,
  body {
    font-family: "Noto Sans KR", sans-serif;
  }
  button {
    cursor: pointer;
  }
`;
