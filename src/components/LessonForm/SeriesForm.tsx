import React from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Form, SubmitButton, ListWrapper } from "./style";
import { Lesson } from "../../store/types";

import { useTypedSelector } from "../../store";
import { format } from "date-fns";

export const SeriesForm: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const dispatch = useDispatch();
  const series = useTypedSelector((state) =>
    Array.prototype.concat
      .apply([], Object.values(state.lessons))
      .filter((l: Lesson) => l.seriesId)
      .sort(function compare(a: Lesson, b: Lesson) {
        const dateA = new Date(a.start);
        const dateB = new Date(b.start);
        return dateA.getTime() - dateB.getTime();
      })
  );

  const seriesIds = [...new Set(series.map((lesson) => lesson.seriesId))];
  console.log(seriesIds);

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
        {/* {series.length ? (
          <ListWrapper>
            <ul>
              {series.map((l: Lesson) => (
                <li
                  style={{
                    color: l.seriesId === lesson.seriesId ? "red" : "black",
                  }}
                >
                  {l.start}
                </li>
              ))}
            </ul>
          </ListWrapper> */}
        {series.length && seriesIds.length ? (
          <ListWrapper>
            <ul>
              {seriesIds.map((id: string) => {
                const first: Lesson = series.find(
                  (l: Lesson) => l.seriesId === id
                );
                const last: Lesson = series
                  .reverse()
                  .find((l: Lesson) => l.seriesId === id);

                const size: number = series.filter(
                  (l: Lesson) => l.seriesId === id
                ).length;
                return (
                  <li>
                    <span style={{ display: "flex" }}>{`${format(
                      new Date(first.start),
                      "do MMMM Y"
                    )} - ${format(new Date(last.start), "do MMMM Y")}`}</span>
                    <span
                      style={{ display: "flex" }}
                    >{`${size} lessons in series`}</span>
                  </li>
                );
              })}
            </ul>
          </ListWrapper>
        ) : (
          <h3>No Series Found</h3>
        )}
        <SubmitButton type="submit">Create</SubmitButton>
      </Form>
    </Wrapper>
  );
};
