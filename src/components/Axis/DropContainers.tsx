import React from "react";
import { ScaleLinear, ScaleTime } from "d3";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";

export const DropContainers: React.FC<{
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
  const startHeight = new Date("2020-07-20T06:00:00.000Z");
  const endHeight = new Date("2020-07-20T06:15:00.000Z");
  const containerHeight = `${scale(endHeight) - scale(startHeight)}px`;
  return ticks(scale, height, tickHeight).map((tick: Date) => (
    <>
      <DropContainer
        id={tick.toISOString()}
        tick={scale(tick)}
        height={containerHeight}
      />
    </>
  ));
};

const DropContainer: React.FC<{
  id: string;
  tick: number;
  height: string;
}> = ({ id, tick, height }) => {
  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop({
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      if (canDrop)
        dispatch(
          actions.updateStartTime({ id: monitor.getItem().id, time: id })
        );
    },
    accept: "*",
    collect: (monitor: { isOver: () => any; canDrop: () => any }) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  let backgroundColor = "rgba(34,150,243, 0)";

  if (isOver && backgroundColor === "rgba(34,150,243, 0)") {
    backgroundColor = "rgba(34,150,243, .5)";
  }

  return (
    <div
      key={id}
      ref={drop}
      style={{
        position: "absolute",
        transform: `translateY(${tick.toFixed(0)}px)`,
        height: height,
        zIndex: 1,
        width: "100%",
        background: backgroundColor,
      }}
    />
  );
};
