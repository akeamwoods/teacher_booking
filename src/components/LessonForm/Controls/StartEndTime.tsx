import React from "react";
import { getTimeSlots } from "../../../helpers/getTimeSlots";
import { Select } from "./style";

export const StartEndTime: React.FC<{
  startTime: string | undefined;
  endTime: string | undefined;
  setStartTime: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEndTime: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({ startTime, endTime, setStartTime, setEndTime }) => {
  const options = getTimeSlots(15, 8, 17.15);
  return (
    <div style={{ display: "flex", marginTop: "10px" }}>
      <Select
        style={{ color: !startTime ? "#7d7d7d" : "#000" }}
        value={options.indexOf(startTime)}
        onChange={(e) => {
          if (e.target.selectedIndex > 0)
            setStartTime(options[e.target.selectedIndex - 1]);
        }}
      >
        <option disabled={startTime ? true : false}>Start Time</option>
        {options
          .filter((_, index) => index < options.length - 1)
          .map((option, index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
      </Select>
      <Select
        style={{ color: !endTime ? "#7d7d7d" : "#000" }}
        value={options.indexOf(endTime)}
        onChange={(e) => {
          if (e.target.selectedIndex > 0)
            setEndTime(options[e.target.selectedIndex - 1]);
        }}
      >
        <option disabled={endTime ? true : false}>End Time</option>
        {options.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
};
