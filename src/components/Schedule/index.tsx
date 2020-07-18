import React from "react";
import { Wrapper } from "./style";
import { useTypedSelector } from "../../store";

export const Schedule = () => {
  const lessons = useTypedSelector(
    (state) => state.lessons[state.selectedDate]
  );
  return (
    <Wrapper>
      {lessons &&
        lessons.map((lesson) => <div key={lesson.id}>{lesson.subject}</div>)}
    </Wrapper>
  );
};
