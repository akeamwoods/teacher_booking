import React from "react";
import { InformationBar } from "../../../components/InformationBar";
import { UserBar } from "../../../components/UserBar";
import { useTypedSelector } from "../../../store";

export const SideBar = () => {
  const focussedLesson = useTypedSelector((state) => state.focussedLesson);
  const isOpen = useTypedSelector((state) => state.infoPanelOpen);

  return (
    <>
      {!isOpen && <UserBar />}
      <InformationBar lesson={focussedLesson} />
    </>
  );
};
