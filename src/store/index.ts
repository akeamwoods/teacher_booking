import { Actions, actions } from "./actions";
import { Reducer, createStore, applyMiddleware } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import produce from "immer";
import { getType } from "typesafe-actions";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  setMonth,
  getMonth,
  startOfDay,
  getDay,
  addDays,
  isBefore,
  isSameDay,
  format,
} from "date-fns";
import { Lesson, Class } from "./types";
import { rootSaga } from "./rootSaga";
import { getLessonColour } from "../helpers/getLessonColour";
import { getDayAsNumber } from "../helpers/getDayAsNumber";
import { v4 as uuidv4 } from "uuid";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "selectedDate",
    "lessons",
    "classes",
    "focussedLesson",
    "infoPanelOpen",
  ],
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

        color: "#f3225a",
      },
      {
        id: "114fc19c-d081-4ec6-91e3-8628d074939a",
        teacherId: "01",
        subject: "French",
        start: "2020-07-20T10:30:00.000Z",
        end: "2020-07-20T11:30:00.000Z",

        color: "#22b7f3",
      },
      {
        id: "850364f0-33eb-4400-a4a4-a9ebbd2650bf",
        teacherId: "01",
        subject: "English",
        start: "2020-07-20T11:45:00.000Z",
        end: "2020-07-20T13:00:00.000Z",
        class: "01",
        color: "#f3ab22",
      },
    ],
  } as { [key: string]: Lesson[] },
  classes: [{ id: "01", year: 7, group: "A", students: [] }] as Class[],
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
      case getType(actions.newSeriesCreated): {
        const days = action.payload.series.days;
        const start = action.payload.series.start;
        const end = action.payload.series.end;
        const startDayNumber = getDay(start);
        const startTime = `${format(
          new Date(action.payload.lesson.start),
          "HH"
        )}:${format(new Date(action.payload.lesson.start), "mm")}`;
        const endTime = `${format(
          new Date(action.payload.lesson.end),
          "HH"
        )}:${format(new Date(action.payload.lesson.end), "mm")}`;
        let daysToAdd: Date[] = [];

        Object.entries(days).forEach((entry) => {
          if (entry[1]) {
            const dayOfWeek = getDayAsNumber(entry[0]);
            const x = (dayOfWeek - startDayNumber + 7) % 7;
            let nextDay = addDays(start, x);
            while (isBefore(nextDay, end) || isSameDay(nextDay, end)) {
              daysToAdd.push(nextDay);
              nextDay = addDays(nextDay, 7);
            }
          }
        });

        daysToAdd.forEach((day) => {
          const key = startOfDay(day).toISOString();

          const lesson = {
            ...action.payload.lesson,
            id: uuidv4(),
            start: new Date(
              new Date(day.setHours(parseFloat(startTime))).setMinutes(
                parseFloat(startTime.slice(-2))
              )
            ).toISOString(),
            end: new Date(
              new Date(day.setHours(parseFloat(endTime))).setMinutes(
                parseFloat(endTime.slice(-2))
              )
            ).toISOString(),
            color: getLessonColour(
              draft.lessons[key]
                ? draft.lessons[key].map((lesson) => lesson.color)
                : []
            ),
          };

          draft.lessons[key]
            ? (draft.lessons[key] = [...draft.lessons[key], lesson])
            : (draft.lessons[key] = [lesson]);
        });

        break;
      }
      case getType(actions.lessonEditedSeriesAdded): {
        const seriesId = uuidv4();
        const days = action.payload.series.days;
        const start = action.payload.series.start;
        const end = action.payload.series.end;
        const startDayNumber = getDay(start);
        const startTime = `${format(
          new Date(action.payload.lesson.start),
          "HH"
        )}:${format(new Date(action.payload.lesson.start), "mm")}`;
        const endTime = `${format(
          new Date(action.payload.lesson.end),
          "HH"
        )}:${format(new Date(action.payload.lesson.end), "mm")}`;
        let daysToAdd: Date[] = [];

        draft.lessons[action.payload.oldKey] = [
          ...draft.lessons[action.payload.oldKey].filter(
            (lesson) => lesson.id !== action.payload.lesson.id
          ),
        ];

        Object.entries(days).forEach((entry) => {
          if (entry[1]) {
            const dayOfWeek = getDayAsNumber(entry[0]);
            const x = (dayOfWeek - startDayNumber + 7) % 7;
            let nextDay = addDays(start, x);
            while (isBefore(nextDay, end) || isSameDay(nextDay, end)) {
              daysToAdd.push(nextDay);
              nextDay = addDays(nextDay, 7);
            }
          }
        });

        daysToAdd.forEach((day) => {
          const key = startOfDay(day).toISOString();

          const lesson = {
            ...action.payload.lesson,
            seriesId: action.payload.lesson.seriesId
              ? action.payload.lesson.seriesId
              : seriesId,
            id: uuidv4(),
            start: new Date(
              new Date(day.setHours(parseFloat(startTime))).setMinutes(
                parseFloat(startTime.slice(-2))
              )
            ).toISOString(),
            end: new Date(
              new Date(day.setHours(parseFloat(endTime))).setMinutes(
                parseFloat(endTime.slice(-2))
              )
            ).toISOString(),
            color: getLessonColour(
              draft.lessons[key]
                ? draft.lessons[key].map((lesson) => lesson.color)
                : []
            ),
          };

          draft.lessons[key]
            ? (draft.lessons[key] = [...draft.lessons[key], lesson])
            : (draft.lessons[key] = [lesson]);
        });

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
