import React, { createRef } from "react";
import { addMonths, isSameMonth, format } from "date-fns";
import { MonthTimelineWrapper, MonthWrapper } from "./style";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/actions";
import { useTypedSelector } from "../../../store";

export const MonthTimeline: React.FC<{
  startOfYear: string;
}> = React.memo(({ startOfYear }) => {
  const months = Array.from(Array(12), (_, index) =>
    addMonths(new Date(startOfYear), index)
  );
  return (
    <MonthTimelineWrapper>
      {months.map((month) => (
        <Month key={month.toISOString()} month={month} />
      ))}
    </MonthTimelineWrapper>
  );
});

export const Month: React.FC<{
  month: Date;
}> = React.memo(({ month }) => {
  const dispatch = useDispatch();
  const isCurrentMonth = useTypedSelector((state) =>
    isSameMonth(new Date(state.selectedDate), month)
  );

  const ref = createRef<HTMLButtonElement>();

  const handleClick = () => {
    dispatch(actions.selectedMonthChanged(month));
  };

  React.useEffect(() => {
    console.log("Month");
    setTimeout(() => {
      if (isCurrentMonth && ref.current)
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
    }, 100);
  }, [isCurrentMonth, ref]);
  return (
    <MonthWrapper
      isCurrentMonth={isCurrentMonth}
      onClick={handleClick}
      ref={ref}
    >
      {format(month, "MMMM")}
    </MonthWrapper>
  );
});
