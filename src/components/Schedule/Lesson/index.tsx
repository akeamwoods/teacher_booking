import React, { createRef } from "react";

import { ScaleTime } from "d3";
import { format, startOfDay } from "date-fns";
import { LessonWrapper } from "./style";
import { Lesson as LessonType } from "./../../../store/types";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/actions";

export const Lesson: React.FC<{
  lesson: LessonType;
  scale: ScaleTime<number, number>;
  colour: string;
}> = React.memo(({ lesson, scale, colour }) => {
  const dispatch = useDispatch();
  const ref = createRef<SVGRectElement>();
  const handleClick = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const deleteLesson = React.useCallback(
    () =>
      dispatch(
        actions.lessonDeleted({
          date: startOfDay(new Date(lesson.start)).toISOString(),
          id: lesson.id,
        })
      ),
    [lesson, dispatch]
  );
  return (
    <LessonWrapper
      colour={colour}
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
      <button onClick={deleteLesson}>delete</button>
    </LessonWrapper>
  );
});
