import React, { ReactElement, ReactNode } from "react";
import { css } from "@emotion/react";

const parentCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
`;

const wrapperCss = css`
  background-color: white;
  width: 350px;
  height: 864px;
`;

function AppLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <main css={parentCss}>
      <div css={wrapperCss}>{children}</div>
    </main>
  );
}

export default AppLayout;
