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
  isAfter,
  isSameDay,
  isBefore,
  isSameMonth,
} from "date-fns";
import { Wrapper, DayWrapper } from "./style";
import { Date } from "./Date";
import { Controls } from "./Controls";

export const DatePicker: React.FC<{
  currentPageDate: Date;
}> = ({ currentPageDate }) => {
  const [date, setDate] = useState(currentPageDate);
  const dayHeadings = ["M", "T", "W", "T", "F", "S", "S"];
  const padding = getDay(startOfMonth(date));
  const paddingDays = padding > 0 ? padding - 1 : padding;
  const daysInMonth = getDaysInMonth(date);
  const futureDays = 42 - paddingDays - daysInMonth;

  const [start, setStart] = useState(undefined as undefined | Date);
  const [end, setEnd] = useState(undefined as undefined | Date);

  const handleClick = (date: Date) => {
    console.log("handle click, date");
    if (start && end) {
      setStart(date);
      setEnd(undefined);
    } else if (start) {
      if (start === date) {
        setStart(undefined);
      } else {
        if (isAfter(date, start)) {
          setEnd(date);
        } else {
          setEnd(start);
          setStart(date);
        }
      }
    } else {
      setStart(date);
    }
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

  const isSelected = (date: Date): boolean => {
    return (start && isSameDay(date, start)) || (end && isSameDay(date, end))
      ? true
      : false;
  };

  const isWithinRange = (date: Date): boolean => {
    return date && end && start && isBefore(date, end) && isAfter(date, start)
      ? true
      : false;
  };

  const sameMonth = (date: Date): boolean => {
    return date && isSameMonth(date, date) ? true : false;
  };

  // const sameMonth = useTypedSelector((state) =>
  //   date && isSameMonth(date, state.date) ? true : false
  // );

  return (
    <Wrapper>
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
            isWithinRange={false}
            isSameMonth={false}
          />
        ))}
        {prevDays.map((day) => (
          <Date
            key={day.toISOString()}
            date={day}
            onClick={handleClick}
            isSelected={isSelected(day)}
            isWithinRange={isWithinRange(day)}
            isSameMonth={sameMonth(day)}
          />
        ))}
        {days.map((day) => (
          <Date
            key={day.toISOString()}
            date={day}
            onClick={handleClick}
            isSelected={isSelected(day)}
            isWithinRange={isWithinRange(day)}
            isSameMonth={sameMonth(day)}
          />
        ))}
        {nextDays.map((day) => (
          <Date
            key={day.toISOString()}
            date={day}
            onClick={handleClick}
            isSelected={isSelected(day)}
            isWithinRange={isWithinRange(day)}
            isSameMonth={sameMonth(day)}
          />
        ))}
      </DayWrapper>
    </Wrapper>
  );
};
