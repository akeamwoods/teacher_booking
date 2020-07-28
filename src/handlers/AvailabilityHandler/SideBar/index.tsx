import React from "react";
import { InformationBar } from "../../../components/InformationBar";
import { useTypedSelector } from "../../../store";

export const SideBar = () => {
  const focussedLesson = useTypedSelector((state) => state.focussedLesson);

  return (
    <>
      <span style={{ position: "relative", display: "flex" }}>
        <InformationBar lesson={focussedLesson} />
      </span>
    </>
  );
};
