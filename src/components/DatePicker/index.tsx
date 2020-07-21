import React, { useState, useCallback } from "react";
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
import { Wrapper, Container, DayWrapper } from "./style";
import { Date } from "./Date";
import { Controls } from "./Controls";
import { DatePickerButton } from "./DatePickerButton";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export const DatePicker: React.FC<{
  selectedDate: Date;
  changeDate: (date: Date) => void;
  close: () => void;
  setOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  singleClick?: boolean;
}> = React.memo(
  ({
    selectedDate,
    changeDate,
    close,
    setOpen,
    isOpen,
    singleClick = false,
  }) => {
    const [date, setDate] = useState(startOfDay(selectedDate));
    const dayHeadings = ["M", "T", "W", "T", "F", "S", "S"];
    const padding = getDay(startOfMonth(date));
    const paddingDays = padding > 0 ? padding - 1 : padding;
    const daysInMonth = getDaysInMonth(date);
    const futureDays = 42 - paddingDays - daysInMonth;
    const handleClick = (day: Date) => {
      changeDate(day);
      if (singleClick) close();
    };

    const ref = React.createRef<HTMLDivElement>();
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

    useOutsideClick(
      ref,
      useCallback(() => {
        close();
        setDate(startOfDay(selectedDate));
      }, [close, selectedDate])
    );
    return (
      <Wrapper ref={ref}>
        <DatePickerButton
          selectedDate={selectedDate}
          onClick={() => {
            setOpen(!isOpen);
          }}
        />
        {isOpen && (
          <Container onClick={(e) => e.stopPropagation()}>
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
                  isSelected={isSameDay(day, selectedDate)}
                  isSameMonth={sameMonth(day)}
                />
              ))}
              {days.map((day) => (
                <Date
                  key={day.toISOString()}
                  date={day}
                  onClick={handleClick}
                  isSelected={isSameDay(day, selectedDate)}
                  isSameMonth={sameMonth(day)}
                />
              ))}
              {nextDays.map((day) => (
                <Date
                  key={day.toISOString()}
                  date={day}
                  onClick={handleClick}
                  isSelected={isSameDay(day, selectedDate)}
                  isSameMonth={sameMonth(day)}
                />
              ))}
            </DayWrapper>
          </Container>
        )}
      </Wrapper>
    );
  }
);
