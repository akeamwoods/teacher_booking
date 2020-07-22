import React from "react";
import { Wrapper } from "./style";
import { Timeline } from "../../components/Timeline";
import { Schedule } from "../../components/Schedule";
import { SideBar } from "./SideBar";

export const AvailabilityHandler = () => {
  return (
    <>
      <Wrapper>
        <Timeline />
        <Schedule />
      </Wrapper>
      <SideBar />
    </>
  );
};
