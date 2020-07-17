import React from "react";
import { Wrapper } from "./style";

export const UserBar = () => {
  return (
    <Wrapper>
      <img
        color="white"
        height="200px"
        src={process.env.PUBLIC_URL + "avatar.png"}
        alt="Avatar"
      />
    </Wrapper>
  );
};
