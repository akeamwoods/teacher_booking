import React from "react";
import { CheckBoxContainer } from "./style";

export const MultiCheckbox: React.FC<{
  checkboxState: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  };
  setCheckbox: React.Dispatch<
    React.SetStateAction<{
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
    }>
  >;
}> = ({ checkboxState, setCheckbox }) => {
  return (
    <CheckBoxContainer>
      <label>Mon</label>
      <input
        type="checkbox"
        checked={checkboxState.monday}
        onChange={() =>
          setCheckbox((checkboxState) => ({
            ...checkboxState,
            monday: !checkboxState.monday,
          }))
        }
      />

      <label>Tue</label>
      <input
        type="checkbox"
        checked={checkboxState.tuesday}
        onChange={() =>
          setCheckbox((checkboxState) => ({
            ...checkboxState,
            tuesday: !checkboxState.tuesday,
          }))
        }
      />

      <label>Wed</label>
      <input
        type="checkbox"
        checked={checkboxState.wednesday}
        onChange={() =>
          setCheckbox((checkboxState) => ({
            ...checkboxState,
            wednesday: !checkboxState.wednesday,
          }))
        }
      />

      <label>Thu</label>
      <input
        type="checkbox"
        checked={checkboxState.thursday}
        onChange={() =>
          setCheckbox((checkboxState) => ({
            ...checkboxState,
            thursday: !checkboxState.thursday,
          }))
        }
      />

      <label>Fri</label>
      <input
        type="checkbox"
        checked={checkboxState.friday}
        onChange={() =>
          setCheckbox((checkboxState) => ({
            ...checkboxState,
            friday: !checkboxState.friday,
          }))
        }
      />
    </CheckBoxContainer>
  );
};
