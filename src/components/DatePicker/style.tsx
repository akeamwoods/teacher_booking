import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 175px;
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid #e1e1e1;
  padding: 10px;
  background: white;
  position: absolute;
`;
export const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 25px);
  grid-template-rows: repeat(7, 25px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  font-size: 0.7em;
`;
