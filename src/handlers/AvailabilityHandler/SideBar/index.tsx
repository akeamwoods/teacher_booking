import React from "react";
import { InformationBar } from "../../../components/InformationBar";
import { UserBar } from "../../../components/UserBar";
import { useTypedSelector } from "../../../store";

export const SideBar = () => {
  const focussedLesson = useTypedSelector((state) => state.focussedLesson);

  return (
    <>
      {!focussedLesson && <UserBar />}
      <InformationBar lesson={focussedLesson} />
    </>
  );
};
