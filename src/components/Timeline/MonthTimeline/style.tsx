import styled from "styled-components";

export const MonthTimelineWrapper = styled.div`
  display: flex;
  overflow: auto;
  margin: 30px 0;
`;

export const MonthWrapper = styled.div`
  display: flex;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 30px;
  }
`;
