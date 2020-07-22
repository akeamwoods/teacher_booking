import styled from "styled-components";
import { getDayColour } from "../../../helpers/getDayColour";
import { getDayTextColour } from "../../../helpers/getDayTextColour";

export const DayTimelineWrapper = styled.div`
  display: flex;
  overflow: auto;
  min-width: 100%;
  justify-content: space-between;
`;

export const DayWrapper = styled.div.attrs<{
  isCurrentDay: boolean;
}>((props) => ({
  style: { borderBottomColor: props.isCurrentDay ? "#2296f3" : "#e1e1e1" },
}))<{ isCurrentDay: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: center;
  cursor: pointer;
  :not(:last-child) {
    padding-right: 10px;
  }
  :not(:first-child) {
    padding-left: 10px;
  }
  border-bottom: 2px solid;
  margin: 0;
`;

export const Day = styled.button.attrs<{
  isCurrentDay: boolean;
  day: Date;
  lessons: number;
}>((props) => ({
  style: {
    background: props.isCurrentDay
      ? "#2296f3"
      : getDayColour(props.day, props.lessons),
    color: props.isCurrentDay
      ? "#fff"
      : getDayTextColour(props.day, props.lessons),
    boxShadow: props.isCurrentDay ? "0 4px 8px 0 rgba(0,0,0,0.2)" : "none",
  },
}))<{ isCurrentDay: boolean; day: Date; lessons: number }>`
  display: flex;
  background: #e1e1e1;
  padding: 25px;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const DayText = styled.p`
  font-size: 0.7em;
  color: #abb1b6;
  padding-bottom: 15px;
`;
