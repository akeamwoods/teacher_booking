import styled from "styled-components";

export const DayTimelineWrapper = styled.div`
  display: flex;
  overflow: auto;
  margin-top: 30px;
`;

export const DayWrapper = styled.div`
  display: flex;
  padding: 10px;
  background: grey;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 20px;
  }
`;
