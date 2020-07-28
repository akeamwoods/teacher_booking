import React from "react";
import { useDrag } from "react-dnd";
import { ScaleTime } from "d3";
import { format, startOfDay, differenceInHours } from "date-fns";
import { LessonWrapper, SubjectText, TimeText } from "./style";
import { Lesson as LessonType } from "../../store/types";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { FaTimes } from "react-icons/fa";

export const Lesson: React.FC<{
  lesson: LessonType;
  scale: ScaleTime<number, number>;
  colour: string;
  isFocussed: boolean;
}> = React.memo(({ lesson, scale, colour, isFocussed }) => {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    dispatch(actions.lessonFocussed(lesson));
  };

  const handleRelease = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const [_, drag] = useDrag({
    item: { type: "*", id: lesson.id },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.8 : 1,
    }),
  });

  const start = new Date(lesson.start);
  const end = new Date(lesson.end);
  return (
    <LessonWrapper
      tabIndex={0}
      colour={colour}
      ref={drag}
      onMouseDown={handleClick}
      onMouseUp={handleRelease}
      style={{ zIndex: isFocussed ? 2 : 1 }}
      height={`${scale(end) - scale(start)}px`}
      transform={`translateY(${scale(start).toFixed(0)}px)`}
      smallHeight={differenceInHours(end, start) < 1}
      key={lesson.id}
    >
      <span>
        <SubjectText>{lesson.subject}</SubjectText>
        <TimeText>{`${format(start, "H:mm")} - ${format(
          end,
          "H:mm"
        )}`}</TimeText>
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatch(
            actions.lessonDeleted({
              date: startOfDay(start).toISOString(),
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
