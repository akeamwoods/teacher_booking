import React from "react";
import { Wrapper } from "./style";
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
          <div
            style={{
              width: "100%",
              height: "40px",
              background: "rgba(0, 0, 0, 0.2)",
              borderRadius: "4px",
              marginLeft: "20px",
              textAlign: "center",
            }}
            key={lesson.id}
          >
            {lesson.subject}
          </div>
        ))}
    </Wrapper>
  );
};
