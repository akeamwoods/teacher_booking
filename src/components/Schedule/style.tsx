import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  margin: 40px 0;
  position: relative;
`;

export const LessonWrapper = styled.div`
  display: flex;
  flex: 1;
  font-size: 0.85em;
  font-weight: 800;
  align-items: center;
  padding-left: 20px;
  height: 50px;
  background: rgba(75, 201, 255, 0.3);
  border-radius: 4px;
  margin-left: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0);
  :hover {
    background: rgba(75, 201, 255, 0.7);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
`;
