import React from "react";
import { Wrapper, TransparentButton } from "./style";
import { format } from "date-fns";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

export const Controls: React.FC<{
  date: Date;
  left: () => void;
  right: () => void;
}> = React.memo(({ date, left, right }) => {
  return (
    <Wrapper>
      <TransparentButton
        onClick={(e) => {
          e.preventDefault();
          left();
        }}
      >
        <FaCaretLeft />
      </TransparentButton>
      <h4>{format(date, "MMMM yyyy")}</h4>
      <TransparentButton
        onClick={(e) => {
          e.preventDefault();
          right();
        }}
      >
        <FaCaretRight />
      </TransparentButton>
    </Wrapper>
  );
});
