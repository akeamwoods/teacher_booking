import styled from "styled-components";

export const MonthTimelineWrapper = styled.div`
  display: flex;
  overflow: auto;
  margin: 30px 0;
  min-width: 100%;
  justify-content: space-between;
  font-size: 1.2em;
  /* button:first-child {
    margin-left: 50px;
  }
  button:last-child {
    margin-right: 50px;
  } */
`;

export const MonthWrapper = styled.button.attrs<{
  isCurrentMonth: boolean;
}>((props) => ({
  style: { fontWeight: props.isCurrentMonth ? 800 : 400 },
}))<{ isCurrentMonth: boolean }>`
  display: flex;
  cursor: pointer;
  font-size: 1.2em;
  border: none;
  background: transparent;
  :not(:last-child) {
    margin-right: 30px;
  }
`;
