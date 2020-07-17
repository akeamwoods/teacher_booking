import React from "react";
import { startOfYear, addMonths, isSameMonth, format } from "date-fns";
import { MonthTimelineWrapper, MonthWrapper } from "./style";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/actions";

export const MonthTimeline: React.FC<{ selectedDate: Date }> = ({
  selectedDate,
}) => {
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
  const dispatch = useDispatch();
  return (
    <MonthWrapper
      style={{ fontWeight: currentMonth ? 800 : 400 }}
      onClick={() => dispatch(actions.exampleAction(month))}
    >
      {format(month, "MMMM")}
    </MonthWrapper>
  );
};
