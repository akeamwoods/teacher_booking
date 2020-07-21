import { ActionType, createAction } from "typesafe-actions";
import { Lesson } from "./types";

const selectedMonthChanged = createAction("selected month changed")<Date>();
const selectedDayChanged = createAction("selected day changed")<Date>();
const newLessonCreated = createAction("new lesson created")<Lesson>();
const lessonDeleted = createAction("lesson deleted")<{
  date: string;
  id: string;
}>();
const popupActivated = createAction("popup activated")();
const popupClosed = createAction("popup closed")();

export const actions = {
  selectedMonthChanged,
  selectedDayChanged,
  newLessonCreated,
  lessonDeleted,
  popupActivated,
  popupClosed,
};

export type Actions = ActionType<typeof actions>;
