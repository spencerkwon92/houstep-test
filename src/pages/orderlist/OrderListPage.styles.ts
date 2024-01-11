import styled from "@emotion/styled";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 57px;
  background-color: black;
  padding: 13px 12px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  gap: 20px;

  overflow-y: hidden;
  padding: 25px 0px;

  &:hover {
    overflow-y: auto;
  }

  #eventContent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    font-size: 18px;
  }
`;

export const PageFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 22px;
  padding: 20px;
  height: 60px;

  border-radius: 20px 20px 0px 0px;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.25);

  font-size: 18px;
  background-color: white;

  button {
    font-size: 18px;
    width: 301px;
    height: 47.92px;
    color: white;
    background-color: #c1c1c1;
    border: none;

    &:hover {
      background-color: black;
    }

    &:disabled {
      background-color: #c1c1c1;
      color: white;
      cursor: not-allowed;
    }
  }
`;
