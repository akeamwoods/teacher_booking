import React from "react";
import {
  getDaysInMonth,
  startOfMonth,
  addDays,
  isSameDay,
  format,
} from "date-fns";
import { DayTimelineWrapper, DayWrapper } from "./style";

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
  return (
    <DayWrapper style={{ background: currentDay ? "blue" : "red" }}>
      {format(day, "d")}
    </DayWrapper>
  );
};
