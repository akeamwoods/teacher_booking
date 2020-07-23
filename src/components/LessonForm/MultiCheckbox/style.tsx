import styled from "styled-components";

export const CheckBoxContainer = styled.span`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: 400 13.3333px Arial;
  input:not(:last-child) {
    margin-right: 10px;
  }
  input:last-child {
    margin-right: 0;
  }
`;
