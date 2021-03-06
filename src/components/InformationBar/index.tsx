import React, { useState } from "react";
import { useTransition } from "react-spring";
import {
  Wrapper,
  ButtonBar,
  Section,
  Heading,
  SubHeading,
  CloseButton,
  LinkedButton,
  Button,
  ButtonSpan,
} from "./style";
import { Lesson } from "../../store/types";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { constants } from "../../constants";
import {
  FaTimes,
  FaEdit,
  FaTrash,
  FaQuestionCircle,
  FaLink,
  FaUnlink,
} from "react-icons/fa";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";
import { Popup } from "../Popup";
import { startOfDay, format } from "date-fns";
import { useTypedSelector } from "../../store";
import { EditLessonForm } from "../Forms/EditLessonForm";
import { SeriesForm } from "../Forms/SeriesForm";

export const InformationBar: React.FC<{
  lesson: Lesson | undefined;
}> = React.memo(({ lesson }) => {
  const isOpen = useTypedSelector((state) => state.infoPanelOpen);
  const color = useTypedSelector((state) => state.infoPanelColor);
  const [isVisible, setVisibility] = useState(false);
  const [mode, setMode] = useState("edit" as "edit" | "series");
  const transitions = useTransition(isOpen, null, {
    from: { transform: "translate(100%)" },
    enter: { transform: "translate(0)" },
    leave: { transform: "translate(100%)" },
    unique: true,
    config: { duration: constants.animationDuration },
  });
  const isPopupOpen = useTypedSelector((state) => state.popupOpen);

  useKeyboardEvent("Escape", () => {
    if (!isPopupOpen) dispatch(actions.closePanelButtonPressed());
  });
  const dispatch = useDispatch();
  const yearGroup = useTypedSelector((state) =>
    state.classes.find((c) => c.id === lesson?.class)
  );
  return (
    <>
      <Popup
        isVisible={isVisible}
        onClick={() => {
          setVisibility(false);
          dispatch(actions.popupClosed());
        }}
        scrollLock
      >
        {lesson && mode === "edit" ? (
          <EditLessonForm
            initialDate={startOfDay(new Date(lesson.start)).toISOString()}
            lesson={lesson}
          />
        ) : mode === "series" ? (
          <SeriesForm lesson={lesson} isOpen={setVisibility} />
        ) : null}
      </Popup>

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Wrapper background={color} style={props} key={key}>
              <CloseButton
                onClick={() => dispatch(actions.closePanelButtonPressed())}
              >
                <FaTimes />
              </CloseButton>
              <img
                src={process.env.PUBLIC_URL + "/blackboard.svg"}
                alt="Blackboard Icon"
              />

              <ButtonBar>
                <Button
                  title="Edit Lesson"
                  disabled={!lesson}
                  onClick={() => {
                    setVisibility(true);
                    setMode("edit");
                    dispatch(actions.popupOpened());
                  }}
                >
                  <FaEdit size="22" />
                </Button>
                <LinkedButton
                  isLinked={lesson?.seriesId ? true : false}
                  title={
                    lesson?.seriesId ? "Series Linked" : "Not part of a series"
                  }
                  disabled={!lesson || !lesson.seriesId}
                  onClick={() => {
                    setVisibility(true);
                    setMode("series");
                    dispatch(actions.popupOpened());
                  }}
                >
                  {lesson?.seriesId ? (
                    <FaLink size="22" />
                  ) : (
                    <FaUnlink size="22" />
                  )}
                </LinkedButton>
                <Button
                  disabled={!lesson}
                  title="Delete Lesson"
                  onClick={() =>
                    lesson
                      ? dispatch(
                          actions.lessonDeleted({
                            key: startOfDay(
                              new Date(lesson.start)
                            ).toISOString(),
                            id: lesson.id,
                          })
                        )
                      : void {}
                  }
                >
                  <FaTrash size="22" />
                </Button>
              </ButtonBar>
              <Section>
                <SubHeading>Subject</SubHeading>
                <Heading>{lesson?.subject ?? "N/A"}</Heading>
              </Section>
              <Section>
                <SubHeading>Date</SubHeading>
                <Heading>
                  {lesson?.start
                    ? format(new Date(lesson.start), "do MMMM Y")
                    : "N/A"}
                </Heading>
              </Section>
              <Section>
                <SubHeading>Time</SubHeading>
                <Heading>
                  {lesson
                    ? `${format(new Date(lesson?.start!), "HH:mm")} - ${format(
                        new Date(lesson?.end),
                        "HH:mm"
                      )}`
                    : "N/A"}
                </Heading>
              </Section>
              <>
                <Section>
                  <SubHeading>Year</SubHeading>
                  <Heading>{yearGroup?.year ?? "N/A"}</Heading>
                </Section>
                <Section>
                  <SubHeading>Class</SubHeading>
                  <ButtonSpan>
                    <Heading>{yearGroup?.group ?? "N/A"}</Heading>
                  </ButtonSpan>
                </Section>
                <Section>
                  <SubHeading>Students</SubHeading>
                  <ButtonSpan>
                    <Heading>{yearGroup?.students.length ?? "N/A"}</Heading>
                    {lesson && lesson.class && (
                      <Button>
                        <FaQuestionCircle />
                      </Button>
                    )}
                  </ButtonSpan>
                </Section>
              </>
            </Wrapper>
          )
      )}
    </>
  );
});
