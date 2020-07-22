import styled from "styled-components";
import { animated } from "react-spring";

export const Wrapper = styled(animated.div).attrs<{
  background: string | undefined;
}>((props) => ({
  style: { background: props.background ? props.background : "transparent" },
}))<{ background: string | undefined }>`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  min-width: 300px;

  button {
    border: none;
    background: transparent;
    color: #fff;
    svg {
      opacity: 1;
    }
    position:absolute:
    right:20px;
  }

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const Heading = styled.h2`
  color: #fff;
  display: flex;
  text-align: center;
  justify-content: center;
  flex: 1;
  margin: 0;
`;
