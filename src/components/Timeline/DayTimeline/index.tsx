import React from "react";
import {
  getDaysInMonth,
  startOfMonth,
  addDays,
  isSameDay,
  format,
  getDay,
} from "date-fns";
import {
  DayTimelineWrapper,
  DayWrapper,
  Day as DayContainer,
  DayText,
} from "./style";
import { actions } from "../../../store/actions";
import { useDispatch } from "react-redux";

export const DayTimeline: React.FC<{ selectedDate: Date }> = ({
  selectedDate,
}) => {
  const daysInMonth = getDaysInMonth(selectedDate);
  const start = startOfMonth(selectedDate);
  const days = Array.from(Array(daysInMonth), (_, index) =>
    addDays(start, index)
  );
  return (
    <DayTimelineWrapper>
      {days.map((day) => (
        <Day day={day} isCurrentDay={isSameDay(selectedDate, day)} />
      ))}
    </DayTimelineWrapper>
  );
};

export const Day: React.FC<{ day: Date; isCurrentDay: boolean }> = ({
  day,
  isCurrentDay,
}) => {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(actions.selectedDayChanged(day));
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  const getDayColour = (day: Date): string => {
    const dayAsNumber = getDay(day);
    //is mon/wed/fri
    if ([1, 3, 5].includes(dayAsNumber)) {
      return "#fdf6ec";
    } else if ([2, 4].includes(dayAsNumber)) {
      return "#ffce85";
    } else {
      return `repeating-linear-gradient(
        135deg,
        #f8f8f7,
        #f8f8f7 2px,
        #efefef 2px,
        #efefef 4px
      )`;
    }
  };
  return (
    <DayWrapper
      onClick={handleClick}
      style={{ borderBottomColor: isCurrentDay ? "#000" : "#e1e1e1" }}
    >
      <DayContainer
        style={{
          background: isCurrentDay ? "#000" : getDayColour(day),
          color: isCurrentDay ? "#fff" : "#000",
        }}
      >
        {format(day, "d")}
      </DayContainer>
      <DayText>{format(day, "E")}</DayText>
    </DayWrapper>
  );
};
