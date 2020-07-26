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
export const SeriesContainer = styled.span`
  display: flex;
  z-index: 1;
  div:first-child {
    margin-right: 5px;
  }
  div:last-child {
    margin-left: 5px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #edebe9;
  border-radius: 4px;
  margin-top: 10px;
`;

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

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  border: 1px solid #eaeaea;
`;

export const SeriesSpan = styled.span`
  display: flex;
  justify-content: center;
  flex-direction: column;
  p,
  h3 {
    margin: 0;
  }
  p {
    font-size: 0.9em;
  }
  h3 {
    font-size: 1.1em;
  }

  :not(:first-child) {
    margin-top: 10px;
  }
`;
