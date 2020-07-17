import React from "react";
import {
  getMonth,
  startOfYear,
  addMonths,
  isSameMonth,
  format,
} from "date-fns";
import { MonthTimelineWrapper, MonthWrapper } from "./style";

export const MonthTimeline: React.FC<{ selectedDate: Date }> = ({
  selectedDate,
}) => {
  const currentMonth = getMonth(selectedDate);
  const start = startOfYear(selectedDate);
  const months = Array.from(Array(12), (_, index) => addMonths(start, index));

  return (
    <MonthTimelineWrapper>
      {months.map((month) => (
        <Month month={month} currentMonth={isSameMonth(selectedDate, month)} />
      ))}
    </MonthTimelineWrapper>
  );
};

export const Month: React.FC<{ month: Date; currentMonth: boolean }> = ({
  month,
  currentMonth,
}) => {
  return (
    <MonthWrapper style={{ background: currentMonth ? "blue" : "red" }}>
      {format(month, "MMMM")}
    </MonthWrapper>
  );
};
