export const getDayAsNumber = (day: string): number => {
  const dayInLowercase = day.toLowerCase();
  if (dayInLowercase === "monday") {
    return 1;
  } else if (dayInLowercase === "tuesday") {
    return 2;
  } else if (dayInLowercase === "wednesday") {
    return 3;
  } else if (dayInLowercase === "thursday") {
    return 4;
  } else if (dayInLowercase === "friday") {
    return 5;
  } else if (dayInLowercase === "saturday") {
    return 6;
  } else {
    return 0;
  }
};
