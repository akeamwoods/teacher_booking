import { getDay } from "date-fns";

export const getDayTextColour = (day: Date, lessons: number): string => {
  const dayAsNumber = getDay(day);
  if ([0, 6].includes(dayAsNumber)) {
    return "#000"; //sat/sun
  } else {
    return lessons === 0 ? "#000" : "#fff";
  }
};
