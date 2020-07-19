import { getDay } from "date-fns";

export const getDayColour = (day: Date): string => {
  const dayAsNumber = getDay(day);
  if ([1, 3, 5].includes(dayAsNumber)) {
    return "#fdf6ec"; //mon/wed/fri
  } else if ([2, 4].includes(dayAsNumber)) {
    return "#ffce85"; //tue/thur
  } else {
    return `repeating-linear-gradient(
        135deg,
        #f8f8f7,
        #f8f8f7 2px,
        #efefef 2px,
        #efefef 4px
      )`; //sat/sun
  }
};
