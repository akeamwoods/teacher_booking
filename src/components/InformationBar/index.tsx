import React, { useState } from "react";
import { useTransition } from "react-spring";
import {
  Wrapper,
  ButtonBar,
  Section,
  Heading,
  SubHeading,
  CloseButton,
  Button,
} from "./style";
import { Lesson } from "../../store/types";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { constants } from "../../constants";
import { FaTimes, FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";
import { LessonForm } from "../LessonForm";
import { Popup } from "../Popup";
import { startOfDay, format } from "date-fns";

export const InformationBar: React.FC<{
  lesson: Lesson | undefined;
  isOpen: boolean;
}> = React.memo(({ lesson, isOpen }) => {
  const [isVisible, setVisibility] = useState(false);
  const transitions = useTransition(isOpen, null, {
    from: { transform: "translate(100%)", opacity: 0 },
    enter: { transform: "translate(0)", opacity: 1 },
    leave: { transform: "translate(100%)", opacity: 0 },
    unique: true,
    config: { duration: constants.animationDuration },
  });

  useKeyboardEvent("Escape", () => {
    dispatch(actions.closePanelButtonPressed());
  });
  const dispatch = useDispatch();

  return (
    <>
      {lesson && (
        <Popup
          isVisible={isVisible}
          onClick={() => {
            setVisibility(false);
          }}
          scrollLock
        >
          <LessonForm
            initialDate={startOfDay(new Date(lesson.start)).toISOString()}
            lesson={lesson}
          />
        </Popup>
      )}
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Wrapper background={lesson?.color} style={props} key={key}>
              <CloseButton
                onClick={() => dispatch(actions.closePanelButtonPressed())}
              >
                <FaTimes />
              </CloseButton>
              <img
                src={process.env.PUBLIC_URL + "blackboard.svg"}
                alt="Blackboard Icon"
              />
              {lesson && (
                <div>
                  <ButtonBar>
                    <Button onClick={() => setVisibility(true)}>
                      <FaEdit size="22" />
                    </Button>

                    <Button
                      onClick={() =>
                        dispatch(
                          actions.lessonDeleted({
                            date: startOfDay(
                              new Date(lesson.start)
                            ).toISOString(),
                            id: lesson.id,
                          })
                        )
                      }
                    >
                      <FaTrash size="22" />
                    </Button>
                  </ButtonBar>
                  <Section>
                    <SubHeading>Subject</SubHeading>
                    <Heading>{lesson.subject}</Heading>
                  </Section>
                  <Section>
                    <SubHeading>Date</SubHeading>
                    <Heading>
                      {lesson.start
                        ? format(new Date(lesson.start), "do MMMM Y")
                        : "N/A"}
                    </Heading>
                  </Section>
                  <Section>
                    <SubHeading>Time</SubHeading>
                    <Heading>
                      {`${format(new Date(lesson.start!), "HH:mm")} - ${format(
                        new Date(lesson.end),
                        "HH:mm"
                      )}`}
                    </Heading>
                  </Section>
                  <>
                    <Section>
                      <SubHeading>Year</SubHeading>
                      <Heading>{lesson.class?.year ?? "N/A"}</Heading>
                    </Section>
                    <Section>
                      <SubHeading>Class</SubHeading>
                      <span style={{ display: "flex" }}>
                        <Heading>{lesson.class?.group ?? "None"}</Heading>
                        {!lesson.class && (
                          <Button>
                            <FaPlusCircle />
                          </Button>
                        )}
                      </span>
                    </Section>
                    <Section>
                      <SubHeading>Students</SubHeading>
                      <Heading>{lesson.class?.students.length ?? "0"}</Heading>
                    </Section>
                  </>
                </div>
              )}
            </Wrapper>
          )
      )}
    </>
  );
});
