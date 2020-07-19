import React, { createRef } from "react";

import { ScaleTime } from "d3";
import { format } from "date-fns";
import { LessonWrapper } from "./style";
import { Lesson as LessonType } from "./../../../store/types";

export const Lesson: React.FC<{
  lesson: LessonType;
  scale: ScaleTime<number, number>;
}> = React.memo(({ lesson, scale }) => {
  const ref = createRef<SVGRectElement>();
  const handleClick = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <LessonWrapper
      ref={ref}
      onClick={handleClick}
      height={`${
        scale(new Date(lesson.end)) - scale(new Date(lesson.start))
      }px`}
      transform={`translateY(${scale(new Date(lesson.start)).toFixed(0)}px)`}
      key={lesson.id}
    >
      <p>{lesson.subject}</p>
      <p>{`${format(new Date(lesson.start), "H:mm")} - ${format(
        new Date(lesson.end),
        "H:mm"
      )}`}</p>
    </LessonWrapper>
  );
});
