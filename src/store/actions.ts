import { ActionType, createAction } from "typesafe-actions";

const exampleAction = createAction("example action")<Date>();
const selectedDayChanged = createAction("selected day changed")<Date>();
const exampleAction2 = createAction("example action 2")();

export const actions = {
  exampleAction,
  selectedDayChanged,
  exampleAction2,
};

export type Actions = ActionType<typeof actions>;
