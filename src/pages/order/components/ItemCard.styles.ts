import styled from "@emotion/styled";

export const ItemCardContainer = styled.div<{ quantity: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;

  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  box-sizing: border-box;
  width: 300px;
  min-height: 80px;
  padding: 0px 12px;
  background-color: ${({ quantity }) =>
    quantity === 0 ? "white" : "rgba(247, 90, 47, 0.1)"};

  .mockImage {
    min-width: 62px;
    min-height: 62px;
    background-color: #d9d9d9;
  }
`;

export const ItemCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  font-size: 18px;

  .contentHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .calcSection {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .btnSection {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-size: 18px;
      button {
        font-size: 18px;
      }
    }
  }

  button {
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    width: 19px;
    height: 22px;
  }
`;

export const Event = styled.div`
  width: 53px;
  height: 23px;
  border-radius: 10px;
  background-color: #f75a2f;
  color: white;
  font-size: 13px;
  text-align: center;
  line-height: 23px;
`;
