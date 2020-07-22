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
  align-items: center;
  img {
    margin-top: 20px;
    width: 80%;
  }
`;
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Heading = styled.h2`
  color: #fff;
  display: flex;
  flex: 1;
  margin: 0;
  text-align: center;
`;

export const SubHeading = styled.p`
  color: #fff;
  display: flex;
  flex: 1;
  margin: 0;
  font-weight: 0;
  text-align: center;
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
  position: absolute;
  top: 10px;
  right: 10px;
`;
