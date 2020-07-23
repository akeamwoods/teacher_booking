import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { startOfDay, format, addWeeks } from "date-fns";
import { Lesson } from "../../store/types";
import { actions } from "../../store/actions";
import { DatePicker } from "../DatePicker";
import { StartEndTime } from "./Controls/StartEndTime";
import { useTypedSelector } from "../../store";
import { ClassAndSeriesControls } from "./Controls/ClassAndSeries";
import { MultiCheckbox } from "./Controls/MultiCheckbox";
import { Wrapper, Form, Input, SubmitButton, SeriesContainer } from "./style";

export const EditLessonForm: React.FC<{
  initialDate: string;
  lesson: Lesson;
}> = ({ initialDate, lesson }) => {
  const dispatch = useDispatch();
  const classOptions = useTypedSelector((state) => state.classes);
  const [date, setDate] = useState(new Date(initialDate));
  const [isOpen, setOpen] = useState(false);
  const [seriesStartOpen, setSeriesStartOpen] = useState(false);
  const [seriesEndOpen, setSeriesEndOpen] = useState(false);
  const [classGroup, setClassGroup] = useState(
    classOptions.find((c) => c.id === lesson.class)
  );

  const [startTime, setStartTime] = useState(
    `${format(new Date(lesson.start), "HH")}:${format(
      new Date(lesson.start),
      "mm"
    )}` as string | undefined
  );
  const [endTime, setEndTime] = useState(
    `${format(new Date(lesson.end), "HH")}:${format(
      new Date(lesson.end),
      "mm"
    )}` as string | undefined
  );
  const [subject, updateSubject] = useState(lesson.subject);
  const [series, setSeries] = useState(false);
  const [seriesStart, setSeriesStart] = useState(date);
  const [seriesEnd, setSeriesEnd] = useState(addWeeks(date, 1));
  const [checkboxState, setCheckbox] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });
  return (
    <Wrapper>
      <h3 style={{ margin: 0 }}>Edit Lesson</h3>
      <img
        style={{ margin: "20px" }}
        height="100px"
        src={process.env.PUBLIC_URL + "edit_calendar.svg"}
        alt="Update Lesson Icon"
      />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (startTime && endTime && classGroup) {
            if (!series) {
              dispatch(
                actions.lessonEdited({
                  lesson: {
                    id: lesson.id,
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
                    color: lesson.color,
                    class: classGroup.id,
                  },
                  oldKey: initialDate,
                })
              );
            } else {
              dispatch(
                actions.lessonEditedSeriesAdded({
                  lesson: {
                    id: lesson.id,
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
                    color: lesson.color,
                    class: classGroup.id,
                  },
                  series: {
                    start: seriesStart,
                    end: seriesEnd,
                    days: checkboxState,
                  },
                  oldKey: initialDate,
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
          Update
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};
