import styled from "styled-components";

export const Wrapper = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
  pointer-events: all;
`;

export const Span = styled.div`
  display: flex;
  position: relative;
  pointer-events: none;
`;

export const Fade = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
`;

export const RightFade = styled(Fade)`
  right: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1)
  );
`;

export const BottomFade = styled(Fade)`
  bottom: 0;
  border-bottom: 2px solid #e1e1e1;
`;

export const BottomRightFade = styled(RightFade)`
  bottom: 0;
  border-bottom: 2px solid #e1e1e1;
`;
