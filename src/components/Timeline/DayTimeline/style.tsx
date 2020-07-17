import styled from "styled-components";

export const DayTimelineWrapper = styled.div`
  display: flex;
  overflow: auto;
  margin-top: 20px;
`;

export const DayWrapper = styled.div`
  display: flex;
  padding: 10px;
  width: 50px;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 20px;
  }
`;
