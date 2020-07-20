import React, { useState } from "react";
import {
  getDaysInMonth,
  startOfMonth,
  getDay,
  addDays,
  addMonths,
  subMonths,
  endOfMonth,
  subDays,
  isSameDay,
  isSameMonth,
  startOfDay,
} from "date-fns";
import { Wrapper, DayWrapper } from "./style";
import { Date } from "./Date";
import { Controls } from "./Controls";

export const DatePicker: React.FC<{
  selectedDate: Date;
  changeDate: (date: Date) => void;
  close: () => void;
}> = React.memo(({ selectedDate, changeDate, close }) => {
  const [date, setDate] = useState(startOfDay(selectedDate));
  const dayHeadings = ["M", "T", "W", "T", "F", "S", "S"];
  const padding = getDay(startOfMonth(date));
  const paddingDays = padding > 0 ? padding - 1 : padding;
  const daysInMonth = getDaysInMonth(date);
  const futureDays = 42 - paddingDays - daysInMonth;

  const [start, setStart] = useState(date);

  const handleClick = (day: Date) => {
    setStart(day);
    changeDate(day);
    close();
  };

  const prevDays = Array(paddingDays)
    .fill(0)
    .map((_, i) =>
      subDays(endOfMonth(subMonths(date, 1)), paddingDays - i - 1)
    );

  const days = Array(daysInMonth)
    .fill(1)
    .map((_, i) => addDays(startOfMonth(date), i));

  const nextDays = Array(futureDays > 0 ? futureDays : 0)
    .fill(0)
    .map((_, i) => addDays(startOfMonth(addMonths(date, 1)), i));

  const sameMonth = (day: Date): boolean => {
    return day && isSameMonth(day, date) ? true : false;
  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <Controls
        date={date}
        left={() => setDate(subMonths(date, 1))}
        right={() => setDate(addMonths(date, 1))}
      />
      <DayWrapper>
        {dayHeadings.map((day, index) => (
          <Date
            key={day + index}
            heading={day}
            isSelected={false}
            isSameMonth={false}
          />
        ))}
        {prevDays.map((day) => (
          <Date
            key={day.toISOString()}
            date={day}
            onClick={handleClick}
            isSelected={isSameDay(day, start)}
            isSameMonth={sameMonth(day)}
          />
        ))}
        {days.map((day) => (
          <Date
            key={day.toISOString()}
            date={day}
            onClick={handleClick}
            isSelected={isSameDay(day, start)}
            isSameMonth={sameMonth(day)}
          />
        ))}
        {nextDays.map((day) => (
          <Date
            key={day.toISOString()}
            date={day}
            onClick={handleClick}
            isSelected={isSameDay(day, start)}
            isSameMonth={sameMonth(day)}
          />
        ))}
      </DayWrapper>
    </Wrapper>
  );
});
