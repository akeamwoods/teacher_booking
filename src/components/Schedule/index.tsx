import React from "react";
import { Wrapper, GridContainer } from "./style";
import { useTypedSelector } from "../../store";
import { scaleTime } from "d3";
import { Axis } from "../Axis";
import { GridLines } from "../Axis/GridLines";
import { Lesson } from "./Lesson";
import { DropContainers } from "../Axis/DropContainers";

export const Schedule = () => {
  const lessons = useTypedSelector(
    (state) => state.lessons[state.selectedDate]
  );
  const day = useTypedSelector((state) => state.selectedDate);
  const tickHeight = 35;

  const scale = scaleTime()
    .range([tickHeight * 15, 0])
    .domain([
      new Date(new Date(day).setHours(parseFloat("17:00"))),
      new Date(new Date(day).setHours(parseFloat("08:00"))),
    ]);

  return (
    <Wrapper
      padding={`${
        scale(new Date("2020-07-20T06:00:00.000Z")) -
        scale(new Date("2020-07-20T05:00:00.000Z"))
      }px 20px`}
    >
      <Axis tickHeight={tickHeight} scale={scale} />
      <GridContainer>
        <GridLines tickHeight={tickHeight} scale={scale} />
        <DropContainers tickHeight={tickHeight / 4} scale={scale} />
        {lessons &&
          lessons.map((lesson, i) => (
            <Lesson
              colour={lesson.color}
              key={lesson.id}
              lesson={lesson}
              scale={scale}
            />
          ))}
      </GridContainer>
    </Wrapper>
  );
};
