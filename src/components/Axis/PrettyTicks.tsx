import { ScaleLinear, ScaleTime } from "d3-scale";

export const constants = {
  tickWidth: 100,
  decPlace: 3,
  tickColour: "#4c4c4c",
  font: "12px Segoe UI",
  subFont: "10px Segoe UI",
};

const prettyTick = (
  scale: ScaleLinear<number, number> | ScaleTime<number, number>,
  width: number,
  tickWidth = constants.tickWidth
) => {
  try {
    const maxNumber = Math.max(Math.floor(width / tickWidth), 1);
    const ticks: any = scale.ticks(maxNumber);
    return ticks.length < maxNumber
      ? ticks
      : ticks.filter((_: any, i: number) => i % 2 === 0);
  } catch (error) {
    return [];
  }
};

export const prettyTickAsPx = (
  scale: ScaleLinear<number, number> | ScaleTime<number, number>,
  width: number,
  tickWidth = constants.tickWidth
) => {
  return prettyTick(scale, width, tickWidth).map(scale);
};

export default prettyTick;
