import React from "react";
import { Wrapper, DateText } from "./style";
import { format, isSameMonth } from "date-fns";

export const Date: React.FC<{
  heading?: string;
  date?: Date;
  onClick?: (date: Date) => void;
  isSameMonth: boolean;
  isSelected: boolean;
  isWithinRange: boolean;
}> = ({ heading, date, onClick, isSelected, isWithinRange }) => {
  return (
    <Wrapper
      isDate={date ? true : false}
      isWithinRange={isWithinRange}
      isSelected={isSelected}
      onClick={() => (date && onClick ? onClick(date) : void {})}
    >
      <DateText
        isHeading={heading ? true : false}
        differentMonth={!isSameMonth}
      >
        {heading ? heading : date ? format(date, "d") : undefined}
      </DateText>
    </Wrapper>
  );
};
