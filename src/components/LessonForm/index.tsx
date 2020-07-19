import React from "react";

export const LessonForm = () => {
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
      <h2 style={{ marginTop: 0 }}>Add a New Lesson</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input></input>
        <button>Add</button>
      </form>
    </div>
  );
};
