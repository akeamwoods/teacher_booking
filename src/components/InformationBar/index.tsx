import React, { useState } from "react";
import { useTransition } from "react-spring";
import { Wrapper, Heading, CloseButton } from "./style";
import { Lesson } from "../../store/types";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { constants } from "../../constants";
import { FaArrowRight } from "react-icons/fa";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";
import { LessonForm } from "../LessonForm";
import { Popup } from "../Popup";
import { startOfDay, format } from "date-fns";

export const InformationBar: React.FC<{
  lesson: { lesson: Lesson; colour: string } | undefined;
  isOpen: boolean;
}> = React.memo(({ lesson, isOpen }) => {
  const [isVisible, setVisibility] = useState(false);
  const transitions = useTransition(isOpen, null, {
    from: { transform: "translate(100%)", opacity: 0 },
    enter: { transform: "translate(0)", opacity: 1 },
    leave: { transform: "translate(100%)", opacity: 0 },
    unique: true,
    config: { duration: constants.animationDuration },
  });

  useKeyboardEvent("Escape", () => {
    dispatch(actions.infoPanelClosed());
  });
  const dispatch = useDispatch();

  return (
    <>
      {lesson && (
        <Popup
          isVisible={isVisible}
          onClick={() => {
            setVisibility(false);
          }}
          scrollLock
        >
          <LessonForm
            id={lesson.lesson.id}
            initialDate={startOfDay(
              new Date(lesson?.lesson.start)
            ).toISOString()}
            initialSubject={lesson.lesson.subject}
            start={`${format(new Date(lesson.lesson.start), "HH")}:${format(
              new Date(lesson.lesson.start),
              "mm"
            )}`}
            end={`${format(new Date(lesson.lesson.end), "HH")}:${format(
              new Date(lesson.lesson.end),
              "mm"
            )}`}
          />
        </Popup>
      )}
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Wrapper background={lesson?.colour} style={props} key={key}>
              <div>
                <Heading>{lesson?.lesson.subject}</Heading>

                <CloseButton
                  onClick={() => dispatch(actions.infoPanelClosed())}
                >
                  <FaArrowRight size="22" />
                </CloseButton>
              </div>
              <button onClick={() => setVisibility(true)}>Edit</button>
            </Wrapper>
          )
      )}
    </>
  );
});
