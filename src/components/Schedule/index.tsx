import React from "react";
import { Wrapper, GridContainer } from "./style";
import { useTypedSelector } from "../../store";
import { scaleTime } from "d3";
import { Axis } from "../Axis";
import { GridLines } from "../Axis/GridLines";
import { Lesson } from "./Lesson";

export const Schedule = () => {
  const lessons = useTypedSelector(
    (state) => state.lessons[state.selectedDate]
  );
  const tickHeight = 35;

  const scale = scaleTime()
    .range([tickHeight * 15, 0])
    .domain([
      new Date("2020-07-20T16:00:00.000Z"),
      new Date("2020-07-20T07:00:00.000Z"),
    ]);

  return (
    <Wrapper
      padding={`${
        scale(new Date("2020-07-20T06:00:00.000Z")) -
        scale(new Date("2020-07-20T05:00:00.000Z"))
      }px 0`}
    >
      <Axis tickHeight={tickHeight} scale={scale} />
      <GridContainer>
        <GridLines tickHeight={tickHeight} scale={scale} />
        {lessons &&
          lessons.map((lesson) => (
            <Lesson key={lesson.id} lesson={lesson} scale={scale} />
          ))}
      </GridContainer>
    </Wrapper>
  );
};
