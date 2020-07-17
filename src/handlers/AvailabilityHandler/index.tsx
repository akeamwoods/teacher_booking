import React from "react";
import { Wrapper } from "./style";
import { Timeline } from "../../components/Timeline";
import { useTypedSelector } from "../../store";
import { MonthTimeline } from "../../components/Timeline/MonthTimeline";
import { DayTimeline } from "../../components/Timeline/DayTimeline";

export const AvailabilityHandler = () => {
  const date = useTypedSelector((state) => new Date(state.selectedDate));
  return (
    <div style={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
      <Wrapper>
        {/* <Timeline selectedDate={} /> */}
        <MonthTimeline selectedDate={date} />
      </Wrapper>
      <Wrapper>
        {/* <Timeline selectedDate={} /> */}

        <DayTimeline selectedDate={date} />
      </Wrapper>
    </div>
  );
};
