import React from "react";
import { Wrapper } from "./style";
import { useTypedSelector } from "../../store";
import { startOfDay, endOfDay } from "date-fns";
import { scaleTime } from "d3";
import { Axis } from "../Axis";

export const Schedule = () => {
  const lessons = useTypedSelector(
    (state) => state.lessons[state.selectedDate]
  );

  const scale = scaleTime()
    .range([400, 0])
    .domain([endOfDay(new Date()), startOfDay(new Date())]);

  return (
    <Wrapper>
      <Axis scale={scale} />
      {lessons &&
        lessons.map((lesson) => <div key={lesson.id}>{lesson.subject}</div>)}
    </Wrapper>
  );
};
