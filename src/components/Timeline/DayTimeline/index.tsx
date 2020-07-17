import React from "react";
import {
  getDaysInMonth,
  startOfMonth,
  addDays,
  isSameDay,
  format,
} from "date-fns";
import { DayTimelineWrapper, DayWrapper } from "./style";
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
  return (
    <DayWrapper
      style={{ background: currentDay ? "blue" : "red" }}
      onClick={() => dispatch(actions.selectedDayChanged(day))}
    >
      {format(day, "d")}
    </DayWrapper>
  );
};
