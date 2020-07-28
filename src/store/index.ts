import { Actions, actions } from "./actions";
import { Reducer, createStore } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import produce from "immer";
import { getType } from "typesafe-actions";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import {
  setMonth,
  getMonth,
  startOfDay,
  format,
  differenceInMinutes,
  addMinutes,
} from "date-fns";
import { Lesson, Class } from "./types";
import { getLessonColour } from "../helpers/getLessonColour";
import { v4 as uuidv4 } from "uuid";
import {
  createDaysFromArray,
  addDaysToDictionary,
} from "../helpers/dateHelpers";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "selectedDate",
    "lessons",
    "classes",
    "focussedLesson",
    "infoPanelOpen",
    "popupOpen",
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
        class: "01",
        color: "#f3225a",
      },
      {
        id: "114fc19c-d081-4ec6-91e3-8628d074939a",
        teacherId: "01",
        subject: "French",
        start: "2020-07-20T10:30:00.000Z",
        end: "2020-07-20T11:30:00.000Z",
        class: "01",
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
  popupOpen: false,
  infoPanelColor: undefined as string | undefined,
});

export type State = Readonly<ReturnType<typeof initialState>>;

export const rootReducer: Reducer<State, Actions> = (
  state = initialState(),
  action: Actions
) =>
  produce(state, (draft) => {
    switch (action.type) {
      case getType(actions.selectedMonthChanged): {
        draft.selectedDate = setMonth(
          new Date(draft.selectedDate),
          getMonth(action.payload)
        ).toISOString();
        break;
      }

      case getType(actions.selectedDayChanged): {
        draft.selectedDate = new Date(action.payload).toISOString();
        break;
      }

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
        const startTime = `${format(
          new Date(action.payload.lesson.start),
          "HH"
        )}:${format(new Date(action.payload.lesson.start), "mm")}`;

        const endTime = `${format(
          new Date(action.payload.lesson.end),
          "HH"
        )}:${format(new Date(action.payload.lesson.end), "mm")}`;

        const daysToAdd = createDaysFromArray(
          action.payload.series.days,
          action.payload.series.start,
          action.payload.series.end
        );

        addDaysToDictionary(
          daysToAdd,
          action.payload.lesson,
          draft.lessons,
          startTime,
          endTime
        );
        break;
      }

      case getType(actions.lessonEditedSeriesAdded): {
        const seriesId = uuidv4();
        const startTime = `${format(
          new Date(action.payload.lesson.start),
          "HH"
        )}:${format(new Date(action.payload.lesson.start), "mm")}`;
        const endTime = `${format(
          new Date(action.payload.lesson.end),
          "HH"
        )}:${format(new Date(action.payload.lesson.end), "mm")}`;

        // remove old lesson details from dictionary
        draft.lessons[action.payload.oldKey] = [
          ...draft.lessons[action.payload.oldKey].filter(
            (lesson) => lesson.id !== action.payload.lesson.id
          ),
        ];

        const daysToAdd = createDaysFromArray(
          action.payload.series.days,
          action.payload.series.start,
          action.payload.series.end
        );

        addDaysToDictionary(
          daysToAdd,
          action.payload.lesson,
          draft.lessons,
          startTime,
          endTime,
          seriesId
        );
        break;
      }

      case getType(actions.lessonDeleted): {
        draft.lessons[action.payload.date] = [
          ...draft.lessons[action.payload.date].filter(
            (lesson) => lesson.id !== action.payload.id
          ),
        ];

        if (!draft.lessons[action.payload.date].length)
          delete draft.lessons[action.payload.date]; // remove key if it has no values

        if (
          draft.focussedLesson &&
          draft.focussedLesson.id === action.payload.id
        )
          draft.focussedLesson = undefined; // if deleted item is focussed, removed
        break;
      }

      case getType(actions.lessonFocussed): {
        draft.focussedLesson = action.payload;
        draft.infoPanelColor = action.payload.color;
        draft.infoPanelOpen = true;
        break;
      }

      case getType(actions.lessonUnfocussed): {
        draft.focussedLesson = undefined;
        break;
      }

      case getType(actions.closePanelButtonPressed): {
        draft.infoPanelOpen = false;
        break;
      }

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

        // update dictionary with new details
        draft.lessons[newKey]
          ? (draft.lessons[newKey] = [
              ...draft.lessons[newKey],
              action.payload.lesson,
            ])
          : (draft.lessons[newKey] = [action.payload.lesson]);

        // update focussed lesson if it has been edited
        if (draft.focussedLesson?.id === action.payload.lesson.id) {
          draft.focussedLesson = action.payload.lesson;
        }
        break;
      }

      case getType(actions.popupOpened): {
        draft.popupOpen = true;
        break;
      }

      case getType(actions.popupClosed): {
        draft.popupOpen = false;
        break;
      }

      case getType(actions.updateStartTime): {
        const lessons =
          draft.lessons[
            startOfDay(new Date(action.payload.time)).toISOString()
          ];
        const lesson = lessons.find((l) => l.id === action.payload.id);
        if (lesson) {
          if (lesson.seriesId) lesson.seriesId = undefined;

          const difference = differenceInMinutes(
            new Date(lesson.end),
            new Date(lesson.start)
          );
          lesson.start = action.payload.time;
          lesson.end = addMinutes(
            new Date(action.payload.time),
            difference
          ).toISOString();

          if (draft.focussedLesson && draft.focussedLesson.id === lesson.id)
            draft.focussedLesson = lesson;
        }
        break;
      }

      case getType(actions.seriesDeleted): {
        for (const [key] of Object.entries(draft.lessons)) {
          draft.lessons[key] = draft.lessons[key].filter(
            (lesson) => lesson.seriesId !== action.payload
          );
          if (!draft.lessons[key].length) delete draft.lessons[key];
        }
        if (
          draft.focussedLesson?.seriesId &&
          draft.focussedLesson.seriesId === action.payload
        )
          draft.focussedLesson = undefined;
        break;
      }
    }
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
export const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
