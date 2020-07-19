import React from "react";
import { Wrapper, LessonWrapper } from "./style";
import { useTypedSelector } from "../../store";
import { scaleTime } from "d3";
import { Axis } from "../Axis";
import { differenceInHours, addHours, format } from "date-fns";

export const Schedule = () => {
  const lessons = useTypedSelector(
    (state) => state.lessons[state.selectedDate]
  );
  const tickHeight = 40;

  const scale = scaleTime()
    .range([
      tickHeight *
        differenceInHours(
          addHours(new Date("2020-07-19T17:00:00.000Z"), 4),
          new Date("2020-07-19T06:00:00.000Z")
        ),
      0,
    ])
    .domain([
      new Date("2020-07-19T17:00:00.000Z"),
      new Date("2020-07-19T06:00:00.000Z"),
    ]);

  return (
    <Wrapper>
      <Axis tickHeight={tickHeight} scale={scale} />
      <span
        style={{
          position: "relative",
          display: "flex",
          flex: 1,
          marginLeft: "20px",
        }}
      >
        {lessons &&
          lessons.map((lesson) => (
            <LessonWrapper
              height={`${
                scale(new Date(lesson.end)) - scale(new Date(lesson.start))
              }px`}
              transform={`translateY(${scale(new Date(lesson.start)).toFixed(
                0
              )}px)`}
              key={lesson.id}
            >
              <p>{lesson.subject}</p>
              <p>{`${format(new Date(lesson.start), "H:mm")} - ${format(
                new Date(lesson.end),
                "H:mm"
              )}`}</p>
            </LessonWrapper>
          ))}
      </span>
    </Wrapper>
  );
};
