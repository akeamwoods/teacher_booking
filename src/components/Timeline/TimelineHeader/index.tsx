import React from "react";
import { Header } from "./style";
import { format } from "date-fns";

export const TimelineHeader: React.FC<{ selectedDate: string }> = React.memo(
  ({ selectedDate }) => {
    return (
      <Header>
        <h1>Availability</h1>
        <span style={{ display: "flex" }}>
          <h4 style={{ alignSelf: "flex-end" }}>
            {format(new Date(selectedDate), "EEEE do MMM Y")}
          </h4>
          <button>+Add</button>
        </span>
      </Header>
    );
  }
);
