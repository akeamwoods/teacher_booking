import styled from "styled-components";

export const DayTimelineWrapper = styled.div`
  display: flex;
  overflow: auto;
  margin-top: 20px;
`;

export const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 20px;
  }
`;

export const Day = styled.div`
  display: flex;
  background: #e1e1e1;
  padding: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const DayText = styled.p`
  font-size: 0.7em;
  font-weight: 800;
  color: #abb1b6;
`;
