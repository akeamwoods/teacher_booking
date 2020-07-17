import React from "react";
import { DayTimeline } from "./DayTimeline";
import { MonthTimeline } from "./MonthTimeline";
import { Wrapper } from "./style";

export const Timeline: React.FC<{ selectedDate: Date }> = ({
  selectedDate,
}) => {
  return (
    <>
      <Wrapper>
        <MonthTimeline selectedDate={selectedDate} />
      </Wrapper>
      <Wrapper>
        <DayTimeline selectedDate={selectedDate} />
      </Wrapper>
    </>
  );
};
