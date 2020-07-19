import React from "react";
import prettyTicks from "./PrettyTicks";
import { ScaleLinear, ScaleTime } from "d3-scale";
import styled from "styled-components";
import { format } from "date-fns";

type Props = {
  colour?: string;
  isVisible?: boolean;
  integerScale?: boolean;
  scale: ScaleLinear<number, number> | ScaleTime<number, number>;
  tickWidth?: number;
  width?: number;
  suffix?: string;
  /** Optional tooltip text; use "{T}" as placeholder for tick value */
  title?: string;
  unitTitle?: string;
};

const defaultProps = {
  colour: "#FFF",
  isVisible: true,
  integerScale: false,
  tickWidth: 30,
  width: 40,
  unitTitle: "",
};

export default function Axis(props: Props) {
  const {
    colour,
    isVisible,
    integerScale,
    scale,
    tickWidth,
    width,
    suffix,
    title,
    unitTitle,
  } = {
    ...defaultProps,
    ...props,
  };

  const height = scale.range()[0];

  return (
    <Container visible={isVisible} width={width} height={height}>
      <UnitText width={width} colour={colour}>
        {unitTitle}
      </UnitText>
      {prettyTicks(scale, height, tickWidth).map((tick: Date) => (
        <Tick
          key={tick.toISOString()}
          colour={colour}
          transform={`translate(-50%, ${scale(tick).toFixed(0)}px)`}
          title={(title
            ? title.replace("{T}", `${tick.toString()} ${unitTitle ?? ""}`)
            : `${tick.toISOString()} ${unitTitle ?? ""}`
          ).trim()}
        >
          {format(tick, "kk:mm")}
          {suffix}
        </Tick>
      ))}
    </Container>
  );
}

const Container = styled.div<{
  visible: boolean;
  height: number;
  width: number;
}>`
  position: relative;
  display: ${(p) => (p.visible ? "block" : "none")};
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
  flex: ${(p) => `0 0 ${p.width}px`};
  text-align: center;
  cursor: ns-resize;
`;

const Tick = styled.div.attrs<{
  colour: string;
  transform: string;
}>((props) => ({
  style: { transform: props.transform },
}))<{ colour: string; transform: string }>`
  position: absolute;
  line-height: 0; /* Line up the *middle* of the number, not its baseline, with its value */
  left: 50%;
  font-size: 0.7em;
  font-weight: 800;
  color: #abb1b6;
`;

const UnitText = styled.div<{ width: number; colour: string }>`
  position: absolute;
  text-align: center;
  width: ${(p) => p.width}px;
  color: ${(p) => p.colour};
  top: -2.1em;
  cursor: default;
  white-space: nowrap;
  overflow: hidden;
`;
