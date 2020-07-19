import React from "react";
import { format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Button } from "./style";

export const DatePicker: React.FC<{ selectedDate: Date }> = ({
  selectedDate,
}) => {
  return (
    <Button type="button">
      {format(selectedDate, "do MMMM Y")}
      <FaRegCalendarAlt />
    </Button>
  );
};
