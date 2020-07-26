import React, { useState } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { format } from "date-fns";
import { FaUnlink, FaTimes } from "react-icons/fa";
import { Lesson } from "../../store/types";
import { useTypedSelector } from "../../store";
import {
  Wrapper,
  Form,
  SubmitButton,
  ListWrapper,
  SeriesSpan,
  SeriesRow,
  Button,
} from "./style";

export const SeriesForm: React.FC<{ lesson: Lesson }> = ({ lesson }) => {
  const lessons = useTypedSelector((state) =>
    Array.prototype.concat
      .apply([], Object.values(state.lessons))
      .filter((l: Lesson) => l.seriesId)
      .filter((l) => l.seriesId === lesson.seriesId)
      .sort(function compare(a: Lesson, b: Lesson) {
        const dateA = new Date(a.start);
        const dateB = new Date(b.start);
        return dateA.getTime() - dateB.getTime();
      })
  );

  const last: Lesson = lessons
    .reverse()
    .find((l: Lesson) => l.seriesId === lesson.seriesId);

  const first: Lesson = lessons
    .reverse()
    .find((l: Lesson) => l.seriesId === lesson.seriesId);

  const size = lessons.length;

  const [series, setSeries] = useState(undefined as undefined | Lesson[]);

  const [cache, setCache] = useState(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  const rowCount = series?.length ?? 0;

  //@ts-ignore
  const renderRow = ({ index, key, style, parent }) => {
    return (
      <>
        {series && (
          <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <SeriesRow style={style} tabIndex={0} color={series[index].color}>
              <div>
                <span />
                <p>{index < 9 ? "0" + (index + 1) : index + 1}</p>
              </div>
              <p>{format(new Date(series[index].start), "EEEE do MMMM Y")}</p>
              <div>
                <Button>
                  <FaUnlink />
                </Button>
                <Button>
                  <FaTimes />
                </Button>
              </div>
            </SeriesRow>
          </CellMeasurer>
        )}
      </>
    );
  };

  return (
    <Wrapper>
      <h3 style={{ margin: 0 }}>Series Details</h3>
      <img
        style={{ margin: "20px" }}
        height="100px"
        src={process.env.PUBLIC_URL + "link_calendar.svg"}
        alt="New Lesson Icon"
      />
      <Form onSubmit={(e) => e.preventDefault()}>
        {last && first && !series && (
          <>
            <SeriesSpan>
              <p>Subject</p>
              <h3>{lesson.subject}</h3>
            </SeriesSpan>
            <SeriesSpan>
              <p>Series Duration</p>
              <h3>{`${format(new Date(first.start), "do MMMM Y")} - ${format(
                new Date(last.start),
                "do MMM Y"
              )}`}</h3>
            </SeriesSpan>
            <SeriesSpan>
              <p>Time</p>
              <h3>
                {`${format(new Date(lesson.start!), "HH:mm")} - ${format(
                  new Date(lesson.end),
                  "HH:mm"
                )}`}
              </h3>
            </SeriesSpan>
            <SeriesSpan style={{ marginBottom: "10px" }}>
              <p>Lessons</p>
              <h3>{size}</h3>
            </SeriesSpan>
          </>
        )}
        {series && (
          <ListWrapper>
            <AutoSizer>
              {({ width, height }) => {
                return (
                  <List
                    tabIndex={0}
                    containerStyle={{ padding: 0, margin: 0 }}
                    deferredMeasurementCache={cache}
                    width={width}
                    height={height}
                    rowHeight={cache.rowHeight}
                    rowRenderer={renderRow}
                    rowCount={rowCount}
                    overscanRowCount={20}
                  />
                );
              }}
            </AutoSizer>
          </ListWrapper>
        )}
        {!series ? (
          <SubmitButton
            type="button"
            onClick={() => (lessons ? setSeries(lessons) : void {})}
          >
            View Lessons
          </SubmitButton>
        ) : (
          <SubmitButton type="button" onClick={() => setSeries(undefined)}>
            View Series
          </SubmitButton>
        )}
      </Form>
    </Wrapper>
  );
};
