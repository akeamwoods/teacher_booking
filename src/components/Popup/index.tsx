import React from "react";
import ReactDOM from "react-dom";
import { useTransition } from "react-spring";
import { FaTimes } from "react-icons/fa";
import { Wrapper, Container, CloseButton } from "./style";
import { useScrollLock } from "../../hooks/useScrollLock";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";

export const Popup: React.FC<{
  isVisible: boolean;
  onClick: () => void;
  scrollLock?: boolean;
}> = ({ isVisible, onClick, children, scrollLock = false }) => {
  useScrollLock(isVisible && scrollLock ? true : false);
  useKeyboardEvent("Escape", () => {
    onClick();
  });
  const transitions = useTransition(isVisible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    unique: true,
    config: { duration: 200 },
  });

  const transitions2 = useTransition(isVisible, null, {
    from: { transform: "scale(0)" },
    enter: { transform: "scale(1)" },
    leave: { transform: "scale(0)" },
    unique: true,
    config: { duration: 200 },
  });

  return ReactDOM.createPortal(
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Wrapper onClick={onClick} style={props} key={key}>
              {transitions2.map(
                ({ item, key, props }) =>
                  item && (
                    <Container
                      key={key}
                      style={props}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {children}
                      <CloseButton onClick={onClick}>
                        <FaTimes />
                      </CloseButton>
                    </Container>
                  )
              )}
            </Wrapper>
          )
      )}
    </>,
    document.body
  );
};
