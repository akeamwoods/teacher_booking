import React, { useState } from "react";
import { Header } from "./style";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/actions";
import { Popup } from "../../Popup";

export const TimelineHeader: React.FC<{
  selectedDate: string;
  mode: string;
}> = React.memo(({ selectedDate, mode }) => {
  const dispatch = useDispatch();
  const options = ["Day View", "Week View", "Month View"];
  const [isVisible, setVisibility] = useState(false);
  return (
    <Header>
      <Popup isVisible={isVisible} onClick={() => setVisibility(false)}>
        hi
      </Popup>
      <h1>Availability</h1>
      <span>
        <h4>{format(new Date(selectedDate), "EEEE do MMM Y")}</h4>
        <select
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
        <button onClick={() => setVisibility(true)}>+Add</button>
      </span>
    </Header>
  );
});
