import { getType } from "typesafe-actions";
import { all, takeLatest } from "@redux-saga/core/effects";
import { actions } from "./actions";
import { exampleSaga } from "./saga";

export function* rootSaga() {
  yield all([takeLatest(getType(actions.exampleAction), exampleSaga)]);
}
