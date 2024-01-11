import type { AppProps } from "next/app";
import { css, Global } from "@emotion/react";
import { RecoilRoot } from "recoil";

const globalCss = css`
  html,
  body {
    font-family: "Noto Sans KR", sans-serif;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Global styles={globalCss} />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
