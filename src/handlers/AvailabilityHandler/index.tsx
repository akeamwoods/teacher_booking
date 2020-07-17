import React from "react";
import { Wrapper } from "./style";
import { Timeline } from "../../components/Timeline";
import { useTypedSelector } from "../../store";

export const AvailabilityHandler = () => {
  const date = useTypedSelector((state) => new Date(state.selectedDate));
  return (
    <Wrapper>
      <h1>Availability</h1>
      <Timeline selectedDate={date} />
    </Wrapper>
  );
};
