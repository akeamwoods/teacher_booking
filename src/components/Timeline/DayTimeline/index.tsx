import React, { useRef } from "react";
import { getDaysInMonth, addDays, format, getDay } from "date-fns";
import {
  DayTimelineWrapper,
  DayWrapper,
  Day as DayContainer,
  DayText,
} from "./style";
import { actions } from "../../../store/actions";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useTypedSelector } from "../../../store";

export const DayTimeline: React.FC<{ startOfMonth: string }> = React.memo(
  ({ startOfMonth }) => {
    const daysInMonth = getDaysInMonth(new Date(startOfMonth));
    const days = Array.from(Array(daysInMonth), (_, index) =>
      addDays(new Date(startOfMonth), index).toISOString()
    );
    return (
      <DayTimelineWrapper>
        {days.map((day) => (
          <Day key={uuidv4()} day={day} />
        ))}
      </DayTimelineWrapper>
    );
  }
);

export const Day: React.FC<{ day: string }> = React.memo(({ day }) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const isCurrentDay = useTypedSelector((state) => state.selectedDate === day);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(actions.selectedDayChanged(new Date(day)));
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

  // useEffect(() => {
  //   if (isCurrentDay)
  //     ref.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //       inline: "center",
  //     });
  // }, [isCurrentDay]);

  return (
    <DayWrapper
      ref={ref}
      onClick={handleClick}
      style={{ borderBottomColor: isCurrentDay ? "#000" : "#e1e1e1" }}
    >
      <DayContainer
        style={{
          background: isCurrentDay ? "#000" : getDayColour(new Date(day)),
          color: isCurrentDay ? "#fff" : "#000",
          boxShadow: isCurrentDay ? "0 4px 8px 0 rgba(0,0,0,0.2)" : "none",
        }}
      >
        {format(new Date(day), "d")}
      </DayContainer>
      <DayText>{format(new Date(day), "E")}</DayText>
    </DayWrapper>
  );
});
