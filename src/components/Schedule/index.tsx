import React from "react";
import { Wrapper } from "./style";
import { useTypedSelector } from "../../store";
import Axis from "../Axis";
import { startOfDay, endOfDay } from "date-fns";
import { scaleTime, scaleLinear } from "d3";
import { NewAxis } from "../NewAxis";

export const Schedule = () => {
  const lessons = useTypedSelector(
    (state) => state.lessons[state.selectedDate]
  );

  const scale1 = scaleTime()
    // .range([0, 500])
    .range([400, 0])
    .domain([endOfDay(new Date()), startOfDay(new Date())]);

  const scale2 = scaleLinear().range([100, 0]).domain([0, 100]).nice();
  return (
    <Wrapper>
      <NewAxis scale={scale1} />
      {lessons &&
        lessons.map((lesson) => <div key={lesson.id}>{lesson.subject}</div>)}
    </Wrapper>
  );
};
