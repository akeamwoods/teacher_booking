import React from "react";
import { DayTimeline } from "./DayTimeline";
import { MonthTimeline } from "./MonthTimeline";
import { Wrapper } from "./style";
import { useTypedSelector } from "../../store";
import { startOfYear, startOfMonth } from "date-fns";

export const Timeline = () => {
  const selectedDate = useTypedSelector((state) => state.selectedDate);
  const start = startOfYear(new Date(selectedDate)).toISOString();
  const selectedMonth = startOfMonth(new Date(selectedDate)).toISOString();
  return (
    <>
      <Wrapper>
        <MonthTimeline startOfYear={start} selectedMonth={selectedMonth} />
      </Wrapper>
      <Wrapper>
        <DayTimeline selectedDate={new Date(selectedDate)} />
      </Wrapper>
    </>
  );
};
