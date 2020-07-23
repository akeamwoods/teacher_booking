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
import { getLessonColour } from "../helpers/getLessonColour";

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
        id: "f949d4f0-b121-4137-bbab-8e8e2cd2b312",
        teacherId: "01",
        subject: "English",
        start: "2020-07-20T07:30:00.000Z",
        end: "2020-07-20T08:30:00.000Z",
        students: [],
        color: "#f3225a",
      },

      {
        id: "114fc19c-d081-4ec6-91e3-8628d074939a",
        teacherId: "01",
        subject: "French",
        start: "2020-07-20T10:30:00.000Z",
        end: "2020-07-20T11:30:00.000Z",
        students: [],
        color: "#22b7f3",
      },
      {
        id: "850364f0-33eb-4400-a4a4-a9ebbd2650bf",
        teacherId: "01",
        subject: "English",
        start: "2020-07-20T11:45:00.000Z",
        end: "2020-07-20T13:00:00.000Z",
        class: {
          id: "01",
          group: "A",
          year: 12,
          students: [
            {
              id: "01",
              firstName: "John",
              surname: "Doe",
            },
          ],
        },
        color: "#f3ab22",
      },
    ],
  } as { [key: string]: Lesson[] },
  focussedLesson: undefined as undefined | Lesson,
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
      case getType(actions.newLessonCreated): {
        const key = startOfDay(new Date(action.payload.start)).toISOString();
        const lesson = {
          ...action.payload,
          color: getLessonColour(
            draft.lessons[key]
              ? draft.lessons[key].map((lesson) => lesson.color)
              : []
          ),
        };
        draft.lessons[key]
          ? (draft.lessons[key] = [...draft.lessons[key], lesson])
          : (draft.lessons[key] = [lesson]);
        break;
      }
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
      case getType(actions.lessonEdited): {
        const oldKey = action.payload.oldKey;
        const newKey = startOfDay(
          new Date(action.payload.lesson.start)
        ).toISOString();
        //remove old lesson
        draft.lessons[oldKey] = [
          ...draft.lessons[oldKey].filter(
            (lesson) => lesson.id !== action.payload.lesson.id
          ),
        ];

        draft.lessons[newKey]
          ? (draft.lessons[newKey] = [
              ...draft.lessons[newKey],
              action.payload.lesson,
            ])
          : (draft.lessons[newKey] = [action.payload.lesson]);

        if (draft.focussedLesson?.id === action.payload.lesson.id) {
          draft.focussedLesson = action.payload.lesson;
        }
        break;
      }
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
