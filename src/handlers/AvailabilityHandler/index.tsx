import React from "react";
import { Wrapper } from "./style";
import { Timeline } from "../../components/Timeline";

export const AvailabilityHandler = () => {
  return (
    <Wrapper>
      <Timeline selectedDate={new Date()} />
    </Wrapper>
  );
};
