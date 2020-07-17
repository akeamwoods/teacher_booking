import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 20px;
  div::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin: 20px 0;

  h1,
  h4 {
    margin: 0;
  }
`;
