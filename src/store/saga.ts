import { put, delay } from "@redux-saga/core/effects";
import { actions } from "./actions";
import { constants } from "../constants";

export function* closeInfoBarSaga() {
  try {
    yield delay(constants.animationDuration);
    yield put(actions.lessonUnfocussed());
  } catch (error) {
    console.log(error);
  }
}
