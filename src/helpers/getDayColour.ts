import { getDay } from "date-fns";

export const getDayColour = (day: Date, lessons: number): string => {
  const dayAsNumber = getDay(day);
  if ([0, 6].includes(dayAsNumber)) {
    return `repeating-linear-gradient(
      135deg,
      #f8f8f7,
      #f8f8f7 2px,
      #efefef 2px,
      #efefef 4px
    )`; //sat/sun
  } else {
    return lessons === 0
      ? "#efefef"
      : lessons < 3
      ? "#81ea76"
      : lessons < 5
      ? "#f6ff80"
      : "#ff7373";
  }
};
