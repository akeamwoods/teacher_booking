import React from "react";
import { useTransition } from "react-spring";
import { Wrapper, Heading } from "./style";
import { Lesson } from "../../store/types";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { constants } from "../../constants";
import { FaArrowRight } from "react-icons/fa";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";

export const InformationBar: React.FC<{
  lesson: { lesson: Lesson; colour: string } | undefined;
  isOpen: boolean;
}> = React.memo(({ lesson, isOpen }) => {
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
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Wrapper background={lesson?.colour} style={props} key={key}>
              <div>
                <Heading>{lesson?.lesson.subject}</Heading>
                <button onClick={() => dispatch(actions.infoPanelClosed())}>
                  <FaArrowRight size="22" />
                </button>
              </div>
            </Wrapper>
          )
      )}
    </>
  );
});
