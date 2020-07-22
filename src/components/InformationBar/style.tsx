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
    width: 80%;
  }
  span {
    margin-top: 20px;
  }
`;

export const ButtonBar = styled.span`
  display: flex;
  justify-content: center;
`;
export const Section = styled.span`
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
  font-size: 1.35em;
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

export const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
`;
