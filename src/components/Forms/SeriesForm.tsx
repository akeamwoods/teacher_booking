import React, { useState } from "react";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { format, startOfDay } from "date-fns";
import { FaUnlink, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Lesson } from "../../store/types";
import { useTypedSelector } from "../../store";
import {
  Wrapper,
  Form,
  SubmitButton,
  ListWrapper,
  SeriesSpan,
  ButtonSpan,
  SeriesRow,
  Button,
} from "./style";
import { actions } from "../../store/actions";

export const SeriesForm: React.FC<{
  lesson: Lesson | undefined;
  isOpen: (value: React.SetStateAction<boolean>) => void;
}> = ({ lesson, isOpen }) => {
  const dispatch = useDispatch();
  const lessons = useTypedSelector((state) =>
    Array.prototype.concat
      .apply([], Object.values(state.lessons))
      .filter((l: Lesson) => l.seriesId)
      .filter((l) => l.seriesId === lesson?.seriesId ?? [])
      .sort(function compare(a: Lesson, b: Lesson) {
        const dateA = new Date(a.start);
        const dateB = new Date(b.start);
        return dateA.getTime() - dateB.getTime();
      })
  );

  const last: Lesson = lessons
    .reverse()
    .find((l: Lesson) => l.seriesId === lesson?.seriesId ?? undefined);

  const first: Lesson = lessons
    .reverse()
    .find((l: Lesson) => l.seriesId === lesson?.seriesId ?? undefined);

  const size = lessons.length;

  const [viewSeries, setViewSeries] = useState(false);

  const [cache] = useState(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  const rowCount = lessons?.length ?? 0;

  //@ts-ignore
  const renderRow = ({ index, key, style, parent }) => {
    return (
      <>
        {lessons && (
          <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <SeriesRow style={style} tabIndex={0} color={lessons[index].color}>
              <div style={{ width: "50px" }}>
                <span />
                <p>{index + 1}</p>
              </div>
              <p>{format(new Date(lessons[index].start), "EEEE do MMMM Y")}</p>
              <div style={{ flex: 1, justifyContent: "flex-end" }}>
                <Button
                  onClick={() =>
                    dispatch(
                      actions.lessonUnlinked({
                        key: startOfDay(
                          new Date(lessons[index].start)
                        ).toISOString(),
                        id: lessons[index].seriesId,
                      })
                    )
                  }
                >
                  <FaUnlink />
                </Button>
                <Button
                  onClick={() =>
                    dispatch(
                      actions.lessonDeleted({
                        key: startOfDay(
                          new Date(lessons[index].start)
                        ).toISOString(),
                        id: lessons[index].id,
                      })
                    )
                  }
                >
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
        src={process.env.PUBLIC_URL + "/link_calendar.svg"}
        alt="New Lesson Icon"
      />
      <Form onSubmit={(e) => e.preventDefault()}>
        {!viewSeries && (
          <>
            <SeriesSpan>
              <p>Subject</p>
              <h3>{lesson?.subject ?? "N/A"}</h3>
            </SeriesSpan>
            <SeriesSpan>
              <p>Series Duration</p>
              <h3>
                {first && last
                  ? `${format(new Date(first.start), "do MMMM Y")} - ${format(
                      new Date(last.start),
                      "do MMM Y"
                    )}`
                  : "N/A"}
              </h3>
            </SeriesSpan>
            <SeriesSpan>
              <p>Time</p>
              <h3>
                {lesson
                  ? `${format(new Date(lesson?.start!), "HH:mm")} - ${format(
                      new Date(lesson?.end),
                      "HH:mm"
                    )}`
                  : "N/A"}
              </h3>
            </SeriesSpan>
            <SeriesSpan style={{ marginBottom: "10px" }}>
              <p>Lessons</p>
              <h3>{size}</h3>
            </SeriesSpan>
          </>
        )}
        {lessons && viewSeries && (
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
        {!viewSeries ? (
          <ButtonSpan>
            <SubmitButton
              type="button"
              disabled={!lesson}
              onClick={() => {
                lesson
                  ? dispatch(actions.seriesDeleted(lesson.seriesId!))
                  : void {};
                isOpen(false);
              }}
            >
              Delete Series
            </SubmitButton>
            <SubmitButton
              disabled={!lessons.length}
              type="button"
              onClick={() => setViewSeries(true)}
            >
              View Lessons
            </SubmitButton>
          </ButtonSpan>
        ) : (
          <SubmitButton type="button" onClick={() => setViewSeries(false)}>
            View Series
          </SubmitButton>
        )}
      </Form>
    </Wrapper>
  );
};
