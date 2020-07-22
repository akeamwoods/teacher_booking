import { Actions, actions } from "./actions";
import { Reducer, createStore, applyMiddleware } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import produce from "immer";
import { getType } from "typesafe-actions";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { setMonth, getMonth, startOfDay } from "date-fns";
import { Lesson } from "./types";
import { rootSaga } from "./rootSaga";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["selectedDate", "lessons", "focussedLesson", "infoPanelOpen"],
};

const initialState = () => ({
  selectedDate: startOfDay(new Date()).toISOString(),
  lessons: {
    "2020-07-19T23:00:00.000Z": [
      {
        id: "01",
        teacherId: "01",
        subject: "English",
        start: "2020-07-20T07:30:00.000Z",
        end: "2020-07-20T08:30:00.000Z",
        students: [],
      },

      {
        id: "02",
        teacherId: "01",
        subject: "French",
        start: "2020-07-20T10:30:00.000Z",
        end: "2020-07-20T11:30:00.000Z",
        students: [],
      },
      {
        id: "03",
        teacherId: "01",
        subject: "English",
        start: "2020-07-20T11:45:00.000Z",
        end: "2020-07-20T13:00:00.000Z",
        students: [],
      },
    ],
  } as { [key: string]: Lesson[] },
  focussedLesson: undefined as undefined | { lesson: Lesson; colour: string },
  infoPanelOpen: false,
});

export type State = Readonly<ReturnType<typeof initialState>>;

export const rootReducer: Reducer<State, Actions> = (
  state = initialState(),
  action: Actions
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getType(actions.selectedMonthChanged):
        draft.selectedDate = setMonth(
          new Date(draft.selectedDate),
          getMonth(action.payload)
        ).toISOString();
        break;
      case getType(actions.selectedDayChanged):
        draft.selectedDate = new Date(action.payload).toISOString();
        break;
      case getType(actions.newLessonCreated):
        draft.lessons[startOfDay(new Date(action.payload.start)).toISOString()]
          ? (draft.lessons[
              startOfDay(new Date(action.payload.start)).toISOString()
            ] = [
              ...draft.lessons[
                startOfDay(new Date(action.payload.start)).toISOString()
              ],
              action.payload,
            ])
          : (draft.lessons[
              startOfDay(new Date(action.payload.start)).toISOString()
            ] = [action.payload]);
        break;
      case getType(actions.lessonDeleted):
        draft.lessons[action.payload.date] = [
          ...draft.lessons[action.payload.date].filter(
            (lesson) => lesson.id !== action.payload.id
          ),
        ];
        break;
      case getType(actions.lessonFocussed):
        draft.focussedLesson = action.payload;
        draft.infoPanelOpen = true;
        break;
      case getType(actions.lessonUnfocussed):
        draft.focussedLesson = undefined;
        break;
      case getType(actions.infoPanelClosed):
        draft.infoPanelOpen = false;
        break;
    }
  });

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
