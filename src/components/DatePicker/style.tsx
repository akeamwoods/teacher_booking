import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  position: relative;
  flex-direction: column;
  flex: 1;
  z-index: 1;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 175px;
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 10px;
  background: white;
  position: absolute;
  right: 0;
  top: 100%;
`;
export const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 25px);
  grid-template-rows: repeat(7, 25px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  font-size: 0.7em;
`;
