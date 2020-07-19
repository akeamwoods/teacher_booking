import React from "react";
import { Wrapper, LessonWrapper } from "./style";
import { useTypedSelector } from "../../store";
import { scaleTime } from "d3";
import { Axis } from "../Axis";

export const Schedule = () => {
  const lessons = useTypedSelector(
    (state) => state.lessons[state.selectedDate]
  );

  const scale = scaleTime()
    .range([600, 0])
    .domain([
      new Date("2020-07-19T17:00:00.000Z"),
      new Date("2020-07-19T06:00:00.000Z"),
    ]);

  return (
    <Wrapper>
      <Axis tickHeight={40} scale={scale} />
      {lessons &&
        lessons.map((lesson) => (
          <LessonWrapper key={lesson.id}>{lesson.subject}</LessonWrapper>
        ))}
    </Wrapper>
  );
};
