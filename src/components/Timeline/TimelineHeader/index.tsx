import React from "react";
import { Header } from "./style";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/actions";

export const TimelineHeader: React.FC<{
  selectedDate: string;
  mode: string;
}> = React.memo(({ selectedDate, mode }) => {
  const dispatch = useDispatch();
  const options = ["Day View", "Week View", "Month View"];
  return (
    <Header>
      <h1>Availability</h1>
      <span style={{ display: "flex" }}>
        <h4 style={{ alignSelf: "flex-end" }}>
          {format(new Date(selectedDate), "EEEE do MMM Y")}
        </h4>
        <select
          style={{
            padding: "0 15px",
            margin: "0 10px",
            borderColor: "#efedea",
            borderRadius: "4px",
            fontWeight: 800,
          }}
          value={options.indexOf(mode)}
          onChange={(e) =>
            dispatch(
              actions.availabilityViewChanged(options[e.target.selectedIndex])
            )
          }
        >
          {options.map((option, index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
        </select>
        <button>+Add</button>
      </span>
    </Header>
  );
});
