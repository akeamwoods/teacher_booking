import React from "react";
import { Wrapper } from "./style";
import { DayTimeline } from "./DayTimeline";
import { MonthTimeline } from "./MonthTimeline";

export const Timeline: React.FC<{ selectedDate: Date }> = ({
  selectedDate,
}) => {
  return (
    <>
      <MonthTimeline selectedDate={selectedDate} />
      <DayTimeline selectedDate={selectedDate} />
    </>
  );
};
