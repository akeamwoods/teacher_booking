import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0 10px 0;
  align-items: center;

  h4 {
    margin: 0;
    padding: 0 20px;
    font-size: 0.8em;
  }
`;

export const TransparentButton = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  opacity: 0.3;
  transition: 0.3s;
  :hover {
    opacity: 1;
  }
`;
