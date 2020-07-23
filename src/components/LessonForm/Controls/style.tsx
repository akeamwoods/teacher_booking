import styled from "styled-components";

export const Select = styled.select`
  background: #fff;
  padding: 10px;
  border: 1px solid #edebe9;
  border-radius: 4px;
  display: flex;
  flex: 1;
  :first-child {
    margin-right: 5px;
  }
  :last-child {
    margin-left: 5px;
  }
`;

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
