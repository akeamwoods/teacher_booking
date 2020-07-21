import styled from "styled-components";

export const LessonWrapper = styled.rect.attrs<{
  transform: string;
  height: string;
  colour: string;
}>((props) => ({
  style: {
    transform: props.transform,
    height: props.height,
    background: props.colour,
  },
}))<{ transform: string; height: string; colour: string }>`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  font-size: 0.8em;
  position: absolute;
  width: calc(100% - 40px);
  padding: 0 20px;
  background: #2296f3;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0.9;
  p {
    margin: 0;
  }
  :hover {
    opacity: 1;
  }
`;
