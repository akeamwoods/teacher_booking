import React from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Form, SubmitButton } from "./style";
import { Lesson } from "../../store/types";

import { useTypedSelector } from "../../store";

export const SeriesForm: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const dispatch = useDispatch();
  const series = useTypedSelector((state) =>
    Array.prototype.concat
      .apply([], Object.values(state.lessons))
      .filter((l) => l.seriesId)
  );

  return (
    <Wrapper>
      <h3 style={{ margin: 0 }}>New Lesson</h3>
      <img
        style={{ margin: "20px" }}
        height="100px"
        src={process.env.PUBLIC_URL + "calendar.svg"}
        alt="New Lesson Icon"
      />
      <Form>
        <SubmitButton type="submit">Create</SubmitButton>
      </Form>
    </Wrapper>
  );
};
