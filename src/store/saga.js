import { put, delay } from "@redux-saga/core/effects";
import { actions } from "./actions";

export function* removeFromCheckoutSaga({ payload }) {
  try {
    yield delay(200);
    yield put(actions.infoPanelClosed());
  } catch {
    console.log();
  }
}
