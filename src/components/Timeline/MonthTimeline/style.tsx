import styled from "styled-components";

export const MonthTimelineWrapper = styled.div`
  display: flex;
  overflow: auto;
  margin: 30px 0;
  min-width: 100%;
  justify-content: space-between;
  font-size: 1.2em;
`;

export const MonthWrapper = styled.div.attrs<{
  isCurrentMonth: boolean;
}>((props) => ({
  style: { fontWeight: props.isCurrentMonth ? 800 : 400 },
}))<{ isCurrentMonth: boolean }>`
  display: flex;
  cursor: pointer;
  :not(:last-child) {
    margin-right: 30px;
  }
`;
