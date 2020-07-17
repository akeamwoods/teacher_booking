import styled from "styled-components";

export const Wrapper = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  overflow: auto;
  padding: 20px;

  div::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;
