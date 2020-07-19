import React from "react";
import { Wrapper } from "./style";
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
      new Date("2020-07-19T16:00:00.000Z"),
      new Date("2020-07-19T07:00:00.000Z"),
    ]);

  return (
    <Wrapper
      style={{
        padding: `${
          scale(new Date("2020-07-19T06:00:00.000Z")) -
          scale(new Date("2020-07-19T05:00:00.000Z"))
        }px 0`,
      }}
    >
      <Axis tickHeight={tickHeight} scale={scale} />
      <span
        style={{
          position: "relative",
          display: "flex",
          flex: 1,
          marginLeft: "20px",
        }}
      >
        <GridLines tickHeight={tickHeight} scale={scale} />
        {lessons &&
          lessons.map((lesson) => (
            <Lesson key={lesson.id} lesson={lesson} scale={scale} />
          ))}
      </span>
    </Wrapper>
  );
};
