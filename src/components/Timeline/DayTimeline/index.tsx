import React from "react";
import {
  getDaysInMonth,
  startOfMonth,
  addDays,
  isSameDay,
  format,
} from "date-fns";
import {
  DayTimelineWrapper,
  DayWrapper,
  Day as DayContainer,
  DayText,
} from "./style";
import { actions } from "../../../store/actions";
import { useDispatch } from "react-redux";

export const DayTimeline: React.FC<{ selectedDate: Date }> = ({
  selectedDate,
}) => {
  const daysInMonth = getDaysInMonth(selectedDate);
  const start = startOfMonth(selectedDate);
  const days = Array.from(Array(daysInMonth), (_, index) =>
    addDays(start, index)
  );
  return (
    <DayTimelineWrapper>
      {days.map((day) => (
        <Day day={day} currentDay={isSameDay(selectedDate, day)} />
      ))}
    </DayTimelineWrapper>
  );
};

export const Day: React.FC<{ day: Date; currentDay: boolean }> = ({
  day,
  currentDay,
}) => {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(actions.selectedDayChanged(day));
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  return (
    <DayWrapper onClick={handleClick}>
      <DayContainer style={{ background: currentDay ? "gold" : "#e1e1e1" }}>
        {format(day, "d")}
      </DayContainer>
      <DayText>{format(day, "E")}</DayText>
    </DayWrapper>
  );
};
