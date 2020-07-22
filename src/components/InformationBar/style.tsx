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
  div {
    display: flex;
    justify-content: space-between;
  }
`;

export const Heading = styled.h2`
  color: #fff;
  display: flex;
  flex: 1;
  margin: 0;
`;

export const ButtonBase = styled.button`
  border: none;
  color: #fff;
  background: none;
  display: flex;
  align-items: center;
  svg {
    opacity: 1;
  }
`;

export const CloseButton = styled(ButtonBase)`
  margin-left: 20px;
`;
