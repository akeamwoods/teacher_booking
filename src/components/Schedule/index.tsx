import React from "react";
import { Wrapper, GridContainer } from "./style";
import { useTypedSelector } from "../../store";
import { scaleTime } from "d3";
import { Axis } from "../Axis";
import { GridLines } from "../Axis/GridLines";
import { Lesson } from "./Lesson";

export const Schedule = () => {
  let colourScheme = [
    "#f3225a",
    "#8822f3",
    "#22b7f3",
    "#22F3D8",
    "#f3ab22",
    "#3eb764",
    "#4E22F3",
    "#8DE8F3",
    "#F32222",
    "#70F322",
    "#F32293",
  ];
  let colours = [] as string[];
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
      }px 0`}
    >
      <Axis tickHeight={tickHeight} scale={scale} />
      <GridContainer>
        <GridLines tickHeight={tickHeight} scale={scale} />
        {lessons &&
          lessons.map((lesson, i) => {
            const color = colourScheme.length
              ? colourScheme[Math.floor(Math.random() * colourScheme.length)]
              : colours[Math.floor(Math.random() * colours.length)];
            colours = [...colours, color];
            colourScheme = colourScheme.filter((c) => c !== color);
            return (
              <Lesson
                colour={color}
                key={lesson.id}
                lesson={lesson}
                scale={scale}
              />
            );
          })}
      </GridContainer>
    </Wrapper>
  );
};
