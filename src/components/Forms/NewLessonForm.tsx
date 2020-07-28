import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { startOfDay, addWeeks } from "date-fns";
import { Wrapper, Form, Input, SubmitButton, SeriesContainer } from "./style";
import { Class, Lesson } from "../../store/types";
import { actions } from "../../store/actions";
import { DatePicker } from "../DatePicker";
import { StartEndTime } from "./Controls/StartEndTime";
import { ClassAndSeriesControls } from "./Controls/ClassAndSeries";
import { MultiCheckbox } from "./Controls/MultiCheckbox";

export const NewLessonForm: React.FC<{
  initialDate: string;
}> = ({ initialDate }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(initialDate));
  const [isOpen, setOpen] = useState(false);
  const [seriesStartOpen, setSeriesStartOpen] = useState(false);
  const [seriesEndOpen, setSeriesEndOpen] = useState(false);
  const [classGroup, setClassGroup] = useState(undefined as undefined | Class);
  const [startTime, setStartTime] = useState(undefined as undefined | string);
  const [seriesStart, setSeriesStart] = useState(date);
  const [seriesEnd, setSeriesEnd] = useState(addWeeks(date, 1));
  const [series, setSeries] = useState(false);
  const [endTime, setEndTime] = useState(undefined as undefined | string);
  const [subject, updateSubject] = useState("");
  const [checkboxState, setCheckbox] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });
  return (
    <Wrapper>
      <h3 style={{ margin: 0 }}>New Lesson</h3>
      <img
        style={{ margin: "20px" }}
        height="100px"
        src={process.env.PUBLIC_URL + "/calendar.svg"}
        alt="New Lesson Icon"
      />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (startTime && endTime && classGroup) {
            if (!series) {
              dispatch(
                actions.newLessonCreated({
                  id: uuidv4(),
                  start: new Date(
                    new Date(date.setHours(parseFloat(startTime))).setMinutes(
                      parseFloat(startTime.slice(-2))
                    )
                  ).toISOString(),
                  end: new Date(
                    new Date(date.setHours(parseFloat(endTime))).setMinutes(
                      parseFloat(endTime.slice(-2))
                    )
                  ).toISOString(),
                  subject,
                  teacherId: "01",
                  class: classGroup?.id,
                } as Lesson)
              );
            } else {
              dispatch(
                actions.newSeriesCreated({
                  lesson: {
                    start: new Date(
                      new Date(date.setHours(parseFloat(startTime))).setMinutes(
                        parseFloat(startTime.slice(-2))
                      )
                    ).toISOString(),
                    end: new Date(
                      new Date(date.setHours(parseFloat(endTime))).setMinutes(
                        parseFloat(endTime.slice(-2))
                      )
                    ).toISOString(),
                    subject,
                    teacherId: "01",
                    seriesId: uuidv4(),
                    class: classGroup?.id,
                  },
                  series: {
                    start: seriesStart,
                    end: seriesEnd,
                    days: checkboxState,
                  },
                })
              );
            }
          }
        }}
      >
        {series ? (
          <SeriesContainer>
            <DatePicker
              close={() => setSeriesStartOpen(false)}
              setOpen={setSeriesStartOpen}
              isOpen={seriesStartOpen}
              changeDate={(date) => setSeriesStart(startOfDay(date))}
              selectedDate={startOfDay(seriesStart)}
              singleClick
            />
            <DatePicker
              close={() => setSeriesEndOpen(false)}
              setOpen={setSeriesEndOpen}
              isOpen={seriesEndOpen}
              changeDate={(date) => setSeriesEnd(startOfDay(date))}
              selectedDate={startOfDay(seriesEnd)}
              singleClick
            />
          </SeriesContainer>
        ) : (
          <DatePicker
            close={() => setOpen(false)}
            setOpen={setOpen}
            isOpen={isOpen}
            changeDate={(date) => setDate(startOfDay(date))}
            selectedDate={startOfDay(date ? date : new Date(initialDate))}
            singleClick
          />
        )}

        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => updateSubject(e.target.value)}
        ></Input>
        <StartEndTime
          startTime={startTime}
          endTime={endTime}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
        />
        <ClassAndSeriesControls
          series={series}
          setSeries={setSeries}
          classGroup={classGroup}
          setClassGroup={setClassGroup}
        />
        {series && (
          <MultiCheckbox
            setCheckbox={setCheckbox}
            checkboxState={checkboxState}
          />
        )}
        <SubmitButton
          disabled={
            !startTime ||
            !endTime ||
            !subject ||
            !classGroup ||
            (series && !Object.values(checkboxState).includes(true))
          }
          type="submit"
        >
          Create
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};
