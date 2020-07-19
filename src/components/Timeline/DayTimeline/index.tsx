import React, { createRef } from "react";
import { getDaysInMonth, addDays, format, startOfDay } from "date-fns";
import {
  DayTimelineWrapper,
  DayWrapper,
  Day as DayContainer,
  DayText,
} from "./style";
import { actions } from "../../../store/actions";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../store";

export const DayTimeline: React.FC<{ startOfMonth: string }> = React.memo(
  ({ startOfMonth }) => {
    const daysInMonth = getDaysInMonth(new Date(startOfMonth));
    const days = Array.from(Array(daysInMonth), (_, index) =>
      addDays(startOfDay(new Date(startOfMonth)), index).toISOString()
    );
    return (
      <DayTimelineWrapper>
        {days.map((day) => (
          <Day key={day} day={day} />
        ))}
      </DayTimelineWrapper>
    );
  }
);

export const Day: React.FC<{ day: string }> = React.memo(({ day }) => {
  const dispatch = useDispatch();
  const ref = createRef<HTMLDivElement>();
  const isCurrentDay = useTypedSelector((state) => state.selectedDate === day);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(actions.selectedDayChanged(startOfDay(new Date(day))));
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  React.useLayoutEffect(() => {
    setTimeout(() => {
      if (isCurrentDay)
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
    }, 140);
  }, [isCurrentDay, ref]);

  return (
    <DayWrapper ref={ref} onClick={handleClick} isCurrentDay={isCurrentDay}>
      <DayContainer isCurrentDay={isCurrentDay} day={new Date(day)}>
        {format(new Date(day), "d")}
      </DayContainer>
      <DayText>{format(new Date(day), "E")}</DayText>
    </DayWrapper>
  );
});
