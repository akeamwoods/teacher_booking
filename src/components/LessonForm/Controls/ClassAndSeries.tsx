import { Class } from "../../../store/types";
import { useTypedSelector } from "../../../store";
import { Select } from "./style";
import React from "react";

export const ClassAndSeriesControls: React.FC<{
  classGroup: Class | undefined;
  setClassGroup: React.Dispatch<React.SetStateAction<Class | undefined>>;
}> = ({ classGroup, setClassGroup }) => {
  const classOptions = useTypedSelector((state) => state.classes);
  return (
    <div style={{ display: "flex", marginTop: "10px", alignItems: "center" }}>
      <Select
        style={{ color: !classGroup ? "#7d7d7d" : "#000" }}
        value={classGroup && classOptions.indexOf(classGroup)}
        onChange={(e) => {
          if (e.target.selectedIndex > 0)
            setClassGroup(classOptions[e.target.selectedIndex - 1]);
        }}
      >
        <option disabled={classGroup ? true : false}>Class</option>
        {classOptions.map((option, index) => (
          <option key={index} value={index}>
            {option.year + option.group}
          </option>
        ))}
      </Select>
      <span
        style={{
          flex: 1,
          marginLeft: "5px",
          padding: "10px",
          border: "1px solid transparent",
        }}
      >
        <label>Series</label>
        <input type="checkbox" checked={false} onChange={() => void {}} />
      </span>
    </div>
  );
};
