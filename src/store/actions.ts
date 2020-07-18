import { ActionType, createAction } from "typesafe-actions";

const selectedMonthChanged = createAction("selected month changed")<Date>();
const selectedDayChanged = createAction("selected day changed")<Date>();
const availabilityViewChanged = createAction("availability view changed ")<
  string
>();
const exampleAction2 = createAction("example action 2")();

export const actions = {
  selectedMonthChanged,
  selectedDayChanged,
  availabilityViewChanged,
  exampleAction2,
};

export type Actions = ActionType<typeof actions>;
