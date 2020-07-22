import { getType } from "typesafe-actions";
import { all, takeEvery } from "@redux-saga/core/effects";
import { actions } from "./actions";
import { removeFromCheckoutSaga } from "./saga";

export function* rootSaga() {
  yield all([
    takeEvery(getType(actions.lessonUnfocussed), removeFromCheckoutSaga),
  ]);
}
