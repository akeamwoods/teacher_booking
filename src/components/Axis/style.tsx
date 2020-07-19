import styled from "styled-components";

export const Wrapper = styled.div.attrs<{
  height: string;
}>((props) => ({
  style: { height: props.height },
}))<{ height: string }>`
  position: relative;
`;

export const Tick = styled.div.attrs<{
  transform: string;
}>((props) => ({
  style: { transform: props.transform },
}))<{ transform: string }>`
  font-size: 0.7em;
  font-weight: 800;
  color: #abb1b6;
  line-height: 0; /* Line up the *middle* of the number, not its baseline, with its value */
`;

export const Rect = styled.rect.attrs<{
  transform: string;
}>((props) => ({
  style: { transform: props.transform },
}))<{ transform: string }>`
  position: absolute;
  width: 100%;
  border-bottom: 1px dotted #edebe9;
  line-height: 0; /* Line up the *middle* of the number, not its baseline, with its value */
`;
