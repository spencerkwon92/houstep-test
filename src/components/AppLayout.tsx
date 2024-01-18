import { ReactNode, FunctionComponent } from "react";
import styled from "@emotion/styled";

type Props = {
  children: ReactNode;
};

const AppLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <LayoutWrapper>
      <LayoutBody>{children}</LayoutBody>
    </LayoutWrapper>
  );
};

export default AppLayout;

const LayoutWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
`;

const LayoutBody = styled.div`
  background-color: white;
  width: 350px;
  height: 864px;
`;
