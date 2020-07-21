import styled from "styled-components";

export const Wrapper = styled.div`
  background: #2296f3;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  button {
    border: none;
    background: none;
    color: #fff;
  }

  span {
    display: flex;
    flex-direction: column;
  }
  span button {
    margin-bottom: 20px;
  }
`;
