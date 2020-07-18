import React from "react";
import { DayTimeline } from "./DayTimeline";
import { MonthTimeline } from "./MonthTimeline";
import { Wrapper } from "./style";
import { startOfYear, startOfMonth } from "date-fns";

export const Timeline: React.FC<{ selectedDate: string }> = React.memo(
  ({ selectedDate }) => {
    const yearStart = startOfYear(new Date(selectedDate)).toISOString();
    const monthStart = startOfMonth(new Date(selectedDate)).toISOString();
    console.log("timeline");
    return (
      <>
        <Wrapper>
          <MonthTimeline startOfYear={yearStart} />
        </Wrapper>
        <Wrapper>
          <DayTimeline startOfMonth={monthStart} />
        </Wrapper>
      </>
    );
  }
);
