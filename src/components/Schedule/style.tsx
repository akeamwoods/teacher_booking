import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

export const LessonWrapper = styled.rect.attrs<{
  transform: string;
  height: string;
}>((props) => ({
  style: { transform: props.transform, height: props.height },
}))<{ transform: string; height: string }>`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  font-size: 0.8em;
  font-weight: 800;
  position: absolute;
  width: calc(100% - 40px);
  padding: 0 20px;
  background: #dbf4ff;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0);
  margin-left: 10px;
  p {
    margin: 0;
  }
  :hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  }
`;