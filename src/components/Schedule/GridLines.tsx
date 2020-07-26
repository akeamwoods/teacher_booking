import React from "react";
import { ScaleLinear, ScaleTime } from "d3";
import { Rect } from "./style";

export const GridLines: React.FC<{
  scale: ScaleLinear<number, number> | ScaleTime<number, number>;
  tickHeight?: number;
}> = ({ scale, tickHeight = 30 }) => {
  const height = scale.range()[0];

  const ticks = (
    scale: ScaleLinear<number, number> | ScaleTime<number, number>,
    height: number,
    tickHeight: number
  ) => {
    try {
      const maxNumber = Math.max(Math.floor(height / tickHeight), 1);
      const ticks: any = scale.ticks(maxNumber);
      return ticks.length < maxNumber
        ? ticks
        : ticks.filter((_: any, i: number) => i % 2 === 0);
    } catch (error) {
      return [];
    }
  };
  return ticks(scale, height, tickHeight).map((tick: Date) => (
    <>
      <Rect
        key={tick.toISOString()}
        transform={`translateY(${scale(tick).toFixed(0)}px)`}
      />
    </>
  ));
};
