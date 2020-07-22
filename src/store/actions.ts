import { ActionType, createAction } from "typesafe-actions";
import { Lesson } from "./types";

const selectedMonthChanged = createAction("selected month changed")<Date>();
const selectedDayChanged = createAction("selected day changed")<Date>();
const newLessonCreated = createAction("new lesson created")<Lesson>();
const lessonDeleted = createAction("lesson deleted")<{
  date: string;
  id: string;
}>();
const lessonFocussed = createAction("lesson focussed")<{
  lesson: Lesson;
  colour: string;
}>();
const lessonUnfocussed = createAction("lesson unfocussed")();
const infoPanelClosed = createAction("info panel closed")();

export const actions = {
  selectedMonthChanged,
  selectedDayChanged,
  newLessonCreated,
  lessonDeleted,
  lessonFocussed,
  infoPanelClosed,
  lessonUnfocussed,
};

export type Actions = ActionType<typeof actions>;
