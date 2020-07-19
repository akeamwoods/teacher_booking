import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin: 30px 0 0 0;

  h1,
  h4 {
    margin: 0;
  }
  button {
    background: #ffce85;
    padding: 0 30px;
    border-radius: 4px;
    border: none;
    font-size: 0.7em;
    font-weight: 800;
  }
  span {
    display: flex;
    h4 {
      align-self: flex-end;
    }
    select {
      padding: 0 15px;
      margin: 0 10px;
      border-color: #efedea;
      border-radius: 4px;
      font-weight: 800;
    }
  }
`;
