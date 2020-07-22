import React from "react";
import { useTransition } from "react-spring";
import { Wrapper } from "./style";
import { Lesson } from "../../store/types";

export const InformationBar: React.FC<{
  lesson: { lesson: Lesson; colour: string } | undefined;
}> = ({ lesson }) => {
  const transitions = useTransition(lesson ? true : false, null, {
    from: { transform: "translate(100%)", opacity: 0 },
    enter: { transform: "translate(0)", opacity: 1 },
    leave: { transform: "translate(100%)", opacity: 0 },
    unique: true,
    config: { duration: 200 },
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Wrapper background={lesson?.colour} style={props} key={key}>
              {lesson?.lesson.subject}
            </Wrapper>
          )
      )}
    </>
  );
};
