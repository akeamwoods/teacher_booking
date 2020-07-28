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

export const AxisWrapper = styled.div.attrs<{
  height: string;
}>((props) => ({
  style: { height: props.height },
}))<{ height: string }>`
  position: relative;
`;

export const GridContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  margin-left: 20px;
`;

export const Tick = styled.div.attrs<{
  transform: string;
}>((props) => ({
  style: { transform: props.transform },
}))<{ transform: string }>`
  font-size: 0.7em;
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

export const LessonWrapper = styled.rect.attrs<{
  transform: string;
  height: string;
  colour: string;
  smallHeight: boolean;
}>((props) => ({
  style: {
    transform: props.transform,
    height: props.height,
    background: props.colour,
  },
}))<{
  transform: string;
  height: string;
  colour: string;
  smallHeight: boolean;
}>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  position: absolute;
  width: calc(100% - 40px);
  padding: 0 20px;
  background: #2296f3;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0.8;
  overflow: hidden;
  z-index: 1;

  :hover {
    opacity: 0.9;
  }

  span {
    display: flex;
    flex-direction: ${({ smallHeight }) => (smallHeight ? "row" : "column")};
    line-height: 1em;

    h4 {
      margin-right: ${({ smallHeight }) => (smallHeight ? "5px" : "0")};
    }
  }
  button {
    border: none;
    color: #fff;
    background: none;
  }
`;

export const SubjectText = styled.h4`
  margin: 0;
  font-weight: 600;
  font-size: 0.8em;
`;

export const TimeText = styled.p`
  margin: 0;
  font-size: 0.7em;
`;
