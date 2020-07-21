import React from "react";
import { DayTimeline } from "./DayTimeline";
import { MonthTimeline } from "./MonthTimeline";
import { Wrapper } from "./style";
import { startOfYear, startOfMonth } from "date-fns";
import { TimelineHeader } from "./TimelineHeader";
import { useTypedSelector } from "../../store";

export const Timeline = () => {
  const selectedDate = useTypedSelector((state) => state.selectedDate);
  const yearStart = startOfYear(new Date(selectedDate)).toISOString();
  const monthStart = startOfMonth(new Date(selectedDate)).toISOString();
  return (
    <>
      <TimelineHeader selectedDate={selectedDate} />
      <Wrapper>
        <MonthTimeline startOfYear={yearStart} />
      </Wrapper>
      <Wrapper>
        <DayTimeline startOfMonth={monthStart} />
      </Wrapper>
    </>
  );
};
