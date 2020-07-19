import styled from "styled-components";
import { animated } from "react-spring";

export const Wrapper = styled(animated.div)`
  position: fixed;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Container = styled(animated.div)`
  padding: 40px;
  display: flex;
  flex-direction: column;
  background: #fff;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  position: relative;
  max-width: 80%;
  max-height: 80%;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
`;
