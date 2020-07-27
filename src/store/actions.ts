import { ActionType, createAction } from "typesafe-actions";
import { Lesson } from "./types";

const selectedMonthChanged = createAction("selected month changed")<Date>();
const selectedDayChanged = createAction("selected day changed")<Date>();
const newLessonCreated = createAction("new lesson created")<Lesson>();
const newSeriesCreated = createAction("new series created")<{
  lesson: Omit<Lesson, "color" | "id">;
  series: {
    start: Date;
    end: Date;
    days: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
    };
  };
}>();
const lessonEdited = createAction("lesson edited")<{
  lesson: Lesson;
  oldKey: string;
}>();
const lessonEditedSeriesAdded = createAction(
  "lesson edited with series added"
)<{
  lesson: Lesson;
  oldKey: string;
  series: {
    start: Date;
    end: Date;
    days: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
    };
  };
}>();

const lessonDeleted = createAction("lesson deleted")<{
  date: string;
  id: string;
}>();
const lessonFocussed = createAction("lesson focussed")<Lesson>();
const lessonUnfocussed = createAction("lesson unfocussed")();
const infoPanelClosed = createAction("info panel closed")();
const closePanelButtonPressed = createAction("close panel button pressed")();
const popupOpened = createAction("popup opened")();
const popupClosed = createAction("popup closed")();

const updateStartTime = createAction("lesson start time updated")<{
  id: string;
  time: string;
}>();

const seriesDeleted = createAction("series deleted")<string>();

export const actions = {
  selectedMonthChanged,
  selectedDayChanged,
  newLessonCreated,
  newSeriesCreated,
  lessonEdited,
  lessonDeleted,
  lessonFocussed,
  infoPanelClosed,
  lessonUnfocussed,
  closePanelButtonPressed,
  lessonEditedSeriesAdded,
  popupOpened,
  popupClosed,
  updateStartTime,
  seriesDeleted,
};

export type Actions = ActionType<typeof actions>;
