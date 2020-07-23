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
} from "react-icons/fa";
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent";
import { Popup } from "../Popup";
import { startOfDay, format } from "date-fns";
import { useTypedSelector } from "../../store";
import { EditLessonForm } from "../LessonForm/EditLessonForm";
import { SeriesForm } from "../LessonForm/SeriesForm";

export const InformationBar: React.FC<{
  lesson: Lesson | undefined;
  isOpen: boolean;
}> = React.memo(({ lesson, isOpen }) => {
  type Mode = "edit" | "series";
  const [isVisible, setVisibility] = useState(undefined as undefined | Mode);
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
  const yearGroup = useTypedSelector((state) =>
    state.classes.find((c) => c.id === lesson?.class)
  );

  return (
    <>
      {lesson && (
        <Popup
          isVisible={isVisible ? true : false}
          onClick={() => {
            setVisibility(undefined);
          }}
          scrollLock
        >
          {isVisible === "edit" && (
            <EditLessonForm
              initialDate={startOfDay(new Date(lesson.start)).toISOString()}
              lesson={lesson}
            />
          )}

          {isVisible === "series" && <SeriesForm lesson={lesson} />}
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
                    <Button onClick={() => setVisibility("edit")}>
                      <FaEdit size="22" />
                    </Button>
                    <LinkedButton
                      isLinked={lesson.seriesId ? true : false}
                      onClick={() => setVisibility("series")}
                    >
                      <FaLink size="22" />
                    </LinkedButton>
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
                      <Heading>{yearGroup?.year ?? "N/A"}</Heading>
                    </Section>
                    <Section>
                      <SubHeading>Class</SubHeading>
                      <ButtonSpan>
                        <Heading>{yearGroup?.group ?? "None"}</Heading>
                      </ButtonSpan>
                    </Section>
                    <Section>
                      <SubHeading>Students</SubHeading>
                      <ButtonSpan>
                        <Heading>{yearGroup?.students.length ?? "0"}</Heading>
                        {lesson.class && (
                          <Button>
                            <FaQuestionCircle />
                          </Button>
                        )}
                      </ButtonSpan>
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
