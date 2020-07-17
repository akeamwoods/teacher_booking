import React from "react";
import { DayTimeline } from "./DayTimeline";
import { MonthTimeline } from "./MonthTimeline";
import { Wrapper } from "./style";
import { useTypedSelector } from "../../store";

export const Timeline = () => {
  const selectedDate = useTypedSelector((state) => state.selectedDate);
  return (
    <>
      <Wrapper>
        <MonthTimeline selectedDate={new Date(selectedDate)} />
      </Wrapper>
      <Wrapper>
        <DayTimeline selectedDate={new Date(selectedDate)} />
      </Wrapper>
    </>
  );
};
