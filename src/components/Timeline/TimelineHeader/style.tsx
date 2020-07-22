import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 30px 20px 0 20px;
  margin: 0;

  h1,
  h4 {
    margin: 0;
  }

  span {
    display: flex;
    select {
      padding: 0 15px;
      margin: 0 10px;
      border-color: #efedea;
      border-radius: 4px;
      font-weight: 800;
    }
  }
`;

const ButtonBase = styled.button`
  padding: 0 30px;
  border-radius: 4px;
  border: none;
  font-size: 0.7em;
  font-weight: 800;
  background: white;
  border: 1px solid #efedea;
  margin-left: 10px;
`;

export const ResetButton = styled(ButtonBase)`
  /* background: #dbf4ff; */
`;

export const AddButton = styled(ButtonBase)`
  /* background: #ffce85; */
`;
