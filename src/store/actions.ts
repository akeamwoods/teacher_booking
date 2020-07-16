import { ActionType, createAction } from "typesafe-actions";

const exampleAction = createAction("example action")<string>();
const exampleAction2 = createAction("example action 2")();

export const actions = {
  exampleAction,
  exampleAction2,
};

export type Actions = ActionType<typeof actions>;
