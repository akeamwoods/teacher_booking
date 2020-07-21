import React from "react";
import { Wrapper } from "./style";
import { Timeline } from "../../components/Timeline";
import { Schedule } from "../../components/Schedule";
import { UserBar } from "../../components/UserBar";

export const AvailabilityHandler = () => {
  return (
    <>
      <Wrapper>
        <Timeline />
        <Schedule />
      </Wrapper>
      <UserBar />
    </>
  );
};
