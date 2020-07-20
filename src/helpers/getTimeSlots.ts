export const getTimeSlots = (
  interval: number,
  startTime: number,
  endTime: number
): any[] => {
  const times = [];
  let start = startTime * 60;

  for (var i = 0; start < endTime * 60; i++) {
    var hh = Math.floor(start / 60); // hours of day in 0-24 format
    var mm = start % 60; // minutes of the hour in 0-55 format
    times[i] = ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
    start = start + interval;
  }

  return times;
};
