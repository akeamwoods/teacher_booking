import styled from "styled-components";

export const Wrapper = styled.div`
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
