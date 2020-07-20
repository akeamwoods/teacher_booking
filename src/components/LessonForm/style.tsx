import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #edebe9;
  margin-top: 10px;
`;

export const Span = styled.span`
  position: relative;
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  z-index: 1;
`;

export const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  border: none;
  background: #4bc9ff;
  color: #fff;
  border-radius: 4px;
  :disabled {
    opacity: 0.4;
  }
`;
