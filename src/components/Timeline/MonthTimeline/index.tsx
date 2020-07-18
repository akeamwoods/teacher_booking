import React, { useRef } from "react";
import { addMonths, isSameMonth, format } from "date-fns";
import { MonthTimelineWrapper, MonthWrapper } from "./style";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/actions";
import { v4 as uuidv4 } from "uuid";
import { useTypedSelector } from "../../../store";

export const MonthTimeline: React.FC<{
  startOfYear: string;
}> = React.memo(({ startOfYear }) => {
  const months = Array.from(Array(12), (_, index) =>
    addMonths(new Date(startOfYear), index)
  );
  console.log("month timeline");
  return (
    <MonthTimelineWrapper>
      {months.map((month) => (
        <Month key={uuidv4()} month={month} />
      ))}
    </MonthTimelineWrapper>
  );
});

export const Month: React.FC<{
  month: Date;
}> = React.memo(({ month }) => {
  const dispatch = useDispatch();
  const currentMonth = useTypedSelector((state) =>
    isSameMonth(new Date(state.selectedDate), month)
  );
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(actions.selectedMonthChanged(month));
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  console.log(month);
  return (
    <MonthWrapper
      style={{ fontWeight: currentMonth ? 800 : 400 }}
      onClick={handleClick}
      ref={ref}
    >
      {format(month, "MMMM")}
    </MonthWrapper>
  );
});
