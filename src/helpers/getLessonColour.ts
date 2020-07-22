export const getLessonColour = (coloursInUse: string[] | undefined): string => {
  const colourScheme = [
    "#f3225a",
    "#22b7f3",
    "#f3ab22",
    "#3eb764",
    "#4E22F3",
    "#F32222",
    "#F32293",
    "#9B22F3",
  ];

  //find the counts using reduce
  var ar = coloursInUse ? [...coloursInUse, ...colourScheme] : colourScheme;
  var cnts = ar.reduce(function (obj, val) {
    //@ts-ignore
    obj[val] = (obj[val] || 0) + 1;
    return obj;
  }, {});
  //Use the keys of the object to get all the values of the array
  //and sort those keys by their counts
  var sorted = Object.keys(cnts).sort(function (a, b) {
    //@ts-ignore
    return cnts[b] - cnts[a];
  });

  return sorted[sorted.length - 1];
};
