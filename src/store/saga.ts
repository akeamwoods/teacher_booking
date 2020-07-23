import { put, delay, call, select } from "@redux-saga/core/effects";
import { actions } from "./actions";
import { constants } from "../constants";
import { getfocussedLesson } from "./selectors";

export function* closeInfoBarSaga() {
  try {
    yield put(actions.infoPanelClosed());
    yield delay(constants.animationDuration);
    yield put(actions.lessonUnfocussed());
  } catch (error) {
    console.log(error);
  }
}

export function* deleteLessonSaga({ payload }: any) {
  const focussedLesson = yield select(getfocussedLesson);
  if (focussedLesson && focussedLesson.id === payload.id) {
    yield call(closeInfoBarSaga);
  }
  try {
  } catch (error) {
    console.log(error);
  }
}
