import React, { createRef } from "react";

import { ScaleTime } from "d3";
import { format, startOfDay } from "date-fns";
import { LessonWrapper } from "./style";
import { Lesson as LessonType } from "./../../../store/types";
import { useDispatch } from "react-redux";
import { actions } from "../../../store/actions";
import { FaTimes } from "react-icons/fa";

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
    dispatch(actions.lessonFocussed({ lesson, colour }));
  };

  const handleFocus = (e: React.FocusEvent<SVGRectElement>) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    dispatch(actions.lessonFocussed({ lesson, colour }));
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
      tabIndex={0}
      colour={colour}
      ref={ref}
      onClick={handleClick}
      onFocus={handleFocus}
      height={`${
        scale(new Date(lesson.end)) - scale(new Date(lesson.start))
      }px`}
      transform={`translateY(${scale(new Date(lesson.start)).toFixed(0)}px)`}
      key={lesson.id}
    >
      <span>
        <p>{lesson.subject}</p>
        <p>{`${format(new Date(lesson.start), "H:mm")} - ${format(
          new Date(lesson.end),
          "H:mm"
        )}`}</p>
      </span>

      <button onClick={deleteLesson}>
        <FaTimes />
      </button>
    </LessonWrapper>
  );
});
