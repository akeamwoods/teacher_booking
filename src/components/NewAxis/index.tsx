import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { ScaleLinear, ScaleTime } from "d3";

export const constants = {
  tickWidth: 100,
  decPlace: 3,
  tickColour: "#4c4c4c",
  font: "12px Segoe UI",
  subFont: "10px Segoe UI",
};

const prettyTicks = (
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

export const NewAxis: React.FC<{
  scale: ScaleLinear<number, number> | ScaleTime<number, number>;
  tickWidth?: number;
}> = ({ scale, tickWidth = 30 }) => {
  const height = scale.range()[0];
  return (
    <div style={{ position: "relative", textAlign: "left" }}>
      {prettyTicks(scale, height, tickWidth).map((tick: Date) => (
        <Tick
          key={tick.toISOString()}
          transform={`translateY(${scale(tick).toFixed(0)}px)`}
        >
          {format(tick, "kk:mm")}
        </Tick>
      ))}
    </div>
  );
};

const Tick = styled.div.attrs<{
  transform: string;
}>((props) => ({
  style: { transform: props.transform },
}))<{ transform: string }>`
  line-height: 0; /* Line up the *middle* of the number, not its baseline, with its value */
  font-size: 0.7em;
  font-weight: 800;
  color: #abb1b6;
`;
