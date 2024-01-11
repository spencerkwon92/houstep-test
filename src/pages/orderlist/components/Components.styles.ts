import styled from "@emotion/styled";

export const OrderCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  border: 1px solid #eeeeee;
  border-radius: 15px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  width: 300px;
  padding: 12px;
  font-size: 18px;

  .totalInfoSection {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const OrderDetailCardContainer = styled.div`
  display: flex;
  gap: 15px;

  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 12px;

  .imageSection {
    min-width: 62px;
    min-height: 62px;
    background-color: #d9d9d9;
  }
`;

export const MenuButtonContainer = styled.button`
  display: flex;
  align-items: center;
  text-align: center;
  border: none;
  background-color: transparent;
`;

export const ModalContainer = styled.dialog<{ isModalOpen: boolean }>`
  position: absolute;
  display: ${({ isModalOpen }) => (isModalOpen ? "flex" : "none")};
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(58, 58, 58, 50%);

  justify-content: center;
  align-items: center;

  border: none;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  background-color: white;
  border-radius: 15px;
  padding: 20px;

  button {
    font-size: 18px;
    width: 301px;
    height: 47.92px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: black;
      color: white;
    }
  }
`;
