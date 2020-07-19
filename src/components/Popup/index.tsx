import React from "react";
import { Wrapper } from "./style";
import ReactDOM from "react-dom";

export const Popup: React.FC<{ isVisible: boolean; onClick: () => void }> = ({
  isVisible,
  onClick,
  children,
}) => {
  return isVisible
    ? ReactDOM.createPortal(
        <Wrapper>
          {children}
          <button onClick={onClick}>Close</button>
        </Wrapper>,
        document.body
      )
    : null;
};
