import React from "react";
import { format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "./style";

export const DatePickerButton: React.FC<{
  selectedDate: Date;
  onClick: () => void;
}> = ({ selectedDate, onClick }) => {
  return (
    <Button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {format(selectedDate, "do MMMM Y")}
      <FaRegCalendarAlt />
    </Button>
  );
};
