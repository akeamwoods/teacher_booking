import React, { useRef } from "react";
import { addMonths, isSameMonth, format } from "date-fns";
import { MonthTimelineWrapper, MonthWrapper } from "./style";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/actions";
import { v4 as uuidv4 } from "uuid";

export const MonthTimeline: React.FC<{
  startOfYear: string;
  selectedMonth: string;
}> = React.memo(({ startOfYear, selectedMonth }) => {
  const months = Array.from(Array(12), (_, index) =>
    addMonths(new Date(startOfYear), index)
  );
  console.log("month timeline");
  return (
    <MonthTimelineWrapper>
      {months.map((month) => (
        <Month
          key={uuidv4()}
          month={month}
          currentMonth={isSameMonth(new Date(selectedMonth), month)}
        />
      ))}
    </MonthTimelineWrapper>
  );
});

export const Month: React.FC<{ month: Date; currentMonth: boolean }> = ({
  month,
  currentMonth,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(actions.selectedMonthChanged(month));
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
  // useEffect(() => {
  //   if (currentMonth) {
  //     ref.current?.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //       inline: "center",
  //     });
  //     console.log("hit");
  //   }
  // }, [month]);
  return (
    <MonthWrapper
      style={{ fontWeight: currentMonth ? 800 : 400 }}
      onClick={handleClick}
      ref={ref}
    >
      {format(month, "MMMM")}
    </MonthWrapper>
  );
};
