import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 20px;
  margin: 1px;
  display: flex;
  flex-direction: column;
  min-width: 300px;

  @media only screen and (max-width: 430px) {
    min-width: 200px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #edebe9;
  border-radius: 4px;
  margin-top: 10px;
`;

export const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  border: none;
  background: #2296f3;
  color: #fff;
  border-radius: 4px;
  :disabled {
    opacity: 0.4;
  }
`;
