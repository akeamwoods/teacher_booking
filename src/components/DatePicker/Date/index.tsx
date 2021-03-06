import React from "react";
import { Wrapper, DateText } from "./style";
import { format } from "date-fns";

export const Date: React.FC<{
  heading?: string;
  date?: Date;
  onClick?: (date: Date) => void;
  isSameMonth: boolean;
  isSelected: boolean;
}> = React.memo(({ heading, date, onClick, isSelected, isSameMonth }) => {
  return (
    <Wrapper
      isDate={date ? true : false}
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
});
