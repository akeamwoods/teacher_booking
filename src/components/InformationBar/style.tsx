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
  flex: 1;
  img {
    width: 80%;
  }
`;

export const ButtonBar = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
export const Section = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
export const Heading = styled.h2`
  color: #fff;
  display: flex;
  flex: 1;
  margin: 0;
  text-align: center;
  font-size: 1.3em;
  font-weight: 600;
`;

export const SubHeading = styled.p`
  color: #fff;
  display: flex;
  flex: 1;
  margin: 0;
  font-weight: 0;
  text-align: center;
`;

export const Button = styled.button`
  border: none;
  color: #fff;
  background: none;
  display: flex;
  align-items: center;
`;

export const LinkedButton = styled(Button).attrs<{
  isLinked: string;
}>((props) => ({}))<{ isLinked: boolean }>`
  svg {
    opacity: ${(props) => (props.isLinked ? "1" : "0.6")};
  }
  :hover svg {
    opacity: 1;
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const ButtonSpan = styled.span`
  display: flex;
  button,
  h2 {
    padding: 0 5px;
  }
`;
