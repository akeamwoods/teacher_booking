import React from "react";
import { useDrag } from "react-dnd";
import { ScaleTime } from "d3";
import { format, startOfDay } from "date-fns";
import { LessonWrapper } from "./style";
import { Lesson as LessonType } from "../../store/types";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { FaTimes } from "react-icons/fa";

export const Lesson: React.FC<{
  lesson: LessonType;
  scale: ScaleTime<number, number>;
  colour: string;
}> = React.memo(({ lesson, scale, colour }) => {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    dispatch(actions.lessonFocussed(lesson));
  };

  const [_, drag] = useDrag({
    item: { type: "*", id: lesson.id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.8 : 1,
    }),
  });
  return (
    <LessonWrapper
      tabIndex={0}
      colour={colour}
      ref={drag}
      onClick={handleClick}
      height={`${
        scale(new Date(lesson.end)) - scale(new Date(lesson.start))
      }px`}
      style={{ zIndex: 1 }}
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

      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(
            actions.lessonDeleted({
              date: startOfDay(new Date(lesson.start)).toISOString(),
              id: lesson.id,
            })
          );
        }}
      >
        <FaTimes />
      </button>
    </LessonWrapper>
  );
});
