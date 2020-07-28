import { getDay, addDays, isBefore, isSameDay, startOfDay } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { getDayAsNumber } from "./getDayAsNumber";
import { Lesson } from "../store/types";
import { getLessonColour } from "./getLessonColour";

export const createDaysFromArray = (
  days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
  },
  start: Date,
  end: Date
): Date[] => {
  let daysToAdd: Date[] = [];
  const startDayNumber = getDay(start);

  // loop through series selected days and add corresponding matches to array
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
  return daysToAdd;
};

export const addDaysToDictionary = (
  days: Date[],
  lesson: Pick<
    Lesson,
    "teacherId" | "subject" | "start" | "end" | "class" | "seriesId"
  >,
  dictionary: any,
  startTime: string,
  endTime: string,
  seriesId?: string
) => {
  days.forEach((day) => {
    const key = startOfDay(day).toISOString();
    const lessonToAdd = {
      ...lesson,
      seriesId: lesson.seriesId
        ? lesson.seriesId
        : seriesId
        ? seriesId
        : undefined,
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
        dictionary[key]
          ? dictionary[key].map((lesson: Lesson) => lesson.color)
          : []
      ),
    };

    dictionary[key]
      ? (dictionary[key] = [...dictionary[key], lessonToAdd])
      : (dictionary[key] = [lessonToAdd]);
  });
  return;
};
