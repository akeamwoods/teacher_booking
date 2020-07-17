import React from "react";
import { Wrapper, Header } from "./style";
import { Timeline } from "../../components/Timeline";
import { useTypedSelector } from "../../store";
import { format } from "date-fns";

export const AvailabilityHandler = () => {
  const date = useTypedSelector((state) => new Date(state.selectedDate));
  return (
    <Wrapper>
      <Header>
        <h1>Availability</h1>
        <span style={{ display: "flex" }}>
          <h4 style={{ alignSelf: "flex-end" }}>
            {format(date, "EEEE do MMM Y")}
          </h4>
          <button>+Add</button>
        </span>
      </Header>
      <Timeline selectedDate={date} />
    </Wrapper>
  );
};
