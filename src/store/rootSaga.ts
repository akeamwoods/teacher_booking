import { getType } from "typesafe-actions";
import { all, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { actions } from "./actions";
import { closeInfoBarSaga, deleteLessonSaga } from "./saga";

export function* rootSaga() {
  yield all([
    takeLatest(getType(actions.closePanelButtonPressed), closeInfoBarSaga),
    takeEvery(getType(actions.lessonDeleted), deleteLessonSaga),
  ]);
}
