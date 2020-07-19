import { Actions, actions } from "./actions";
import { Reducer, createStore } from "redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import produce from "immer";
import { getType } from "typesafe-actions";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { setMonth, getMonth, startOfDay } from "date-fns";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["selectedDate", "lessons"],
};

export type Student = {
  id: string;
  firstName: string;
  surname: string;
};

export type Lesson = {
  id: string;
  subject: string;
  start: string;
  end: string;
  students?: Student[];
};

const initialState = () => ({
  selectedDate: startOfDay(new Date()).toISOString(),
  availabilityView: "Day" as string,
  lessons: {
    "2020-07-18T23:00:00.000Z": [
      {
        id: "01",
        subject: "English",
        start: "2020-07-19T10:00:00.000Z",
        end: "2020-07-19T12:00:00.000Z",
        students: [],
      },
      {
        id: "02",
        subject: "French",
        start: "2020-07-19T13:00:00.000Z",
        end: "2020-07-19T14:00:00.000Z",
        students: [],
      },
    ],
  } as { [key: string]: Lesson[] },
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
      case getType(actions.availabilityViewChanged):
        draft.availabilityView = action.payload;
        break;
    }
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);
export const useTypedSelector: TypedUseSelectorHook<State> = useSelector;
