import styled from "styled-components";

export const MonthTimelineWrapper = styled.div`
  display: flex;
  overflow: auto;
`;

export const MonthWrapper = styled.div`
  display: flex;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 30px;
  }
`;
