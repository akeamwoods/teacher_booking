export const getLessonColour = (coloursInUse: string[] | undefined): string => {
  // this method is used to select the color for each lesson object in such a way that duplicate colours are rare.

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

  //find element frequencies
  const combinedColours = coloursInUse
    ? [...coloursInUse, ...colourScheme]
    : colourScheme;
  const frequencies: { [key: string]: number } = combinedColours.reduce(
    function (obj: { [key: string]: number }, val) {
      obj[val] = (obj[val] || 0) + 1;
      return obj;
    },
    {}
  );

  //sort keys by count
  const sortedFrequencies = Object.keys(frequencies).sort(function (
    a: string,
    b: string
  ) {
    return frequencies[b] - frequencies[a];
  });

  // return least common colour string
  return sortedFrequencies[sortedFrequencies.length - 1];
};
