import { FunctionComponent, ReactNode } from "react";
import Link from "next/link";
import styled from "@emotion/styled";

import { SmallLogo } from "../icons";

type Props = {
  links?: ReactNode;
};

const PageHeader: FunctionComponent<Props> = ({ links = <></> }) => {
  return (
    <HeaderStyle>
      <Link href="/" legacyBehavior>
        <a>
          <SmallLogo />
        </a>
      </Link>
      {links}
    </HeaderStyle>
  );
};

export default PageHeader;

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 57px;
  background-color: black;
  padding: 13px 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
