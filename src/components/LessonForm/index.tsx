import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { Lesson } from "../../store/types";
import { v4 as uuidv4 } from "uuid";
import { subHours } from "date-fns";

export const LessonForm = () => {
  const dispatch = useDispatch();
  const start = "2020-07-19T14:45:00.000Z";
  const end = "2020-07-19T15:45:00.000Z";
  return (
    <div
      style={{
        padding: "20px",
        margin: "1px",
        display: "flex",
        flexDirection: "column",
        minWidth: "300px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Add a New Lesson</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            actions.newLessonCreated({
              id: uuidv4(),
              start: start,
              end: end,
              subject: "Latin",
              teacherId: "01",
            } as Lesson)
          );
        }}
      >
        <input></input>
        <button>Add</button>
      </form>
    </div>
  );
};
