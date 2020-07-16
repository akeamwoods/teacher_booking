import React from "react";
import { getDaysInMonth, startOfMonth, addDays, format } from "date-fns";
import { Wrapper, DayTimelineWrapper, DayWrapper } from "./style";

export const Timeline: React.FC<{ selectedDate: Date }> = ({
  selectedDate,
}) => {
  return (
    <Wrapper>
      <DayTimeline selectedDate={selectedDate} />
    </Wrapper>
  );
};

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
        <Day day={day} />
      ))}
    </DayTimelineWrapper>
  );
};

export const Day: React.FC<{ day: Date }> = ({ day }) => {
  return <DayWrapper>{format(day, "d")}</DayWrapper>;
};
