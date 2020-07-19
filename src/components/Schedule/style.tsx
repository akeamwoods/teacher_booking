import styled from "styled-components";

export const Wrapper = styled.div.attrs<{
  padding: string;
}>((props) => ({
  style: { padding: props.padding },
}))<{ padding: string }>`
  display: flex;
  flex: 1;
  position: relative;
  overflow: auto;
`;

export const GridContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  margin-left: 20px;
`;
