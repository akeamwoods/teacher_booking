import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { Lesson, Class } from "../../store/types";
import { v4 as uuidv4 } from "uuid";
import { DatePicker } from "../DatePicker";
import { startOfDay, format, addWeeks } from "date-fns";
import {
  Form,
  Input,
  Select,
  SubmitButton,
  Wrapper,
  SeriesContainer,
  CheckBoxContainer,
} from "./style";
import { getTimeSlots } from "../../helpers/getTimeSlots";
import { useTypedSelector } from "../../store";

export const LessonForm: React.FC<{
  initialDate: string;
  lesson?: Lesson;
}> = ({ initialDate, lesson }) => {
  const dispatch = useDispatch();
  const options = getTimeSlots(15, 8, 17.15);
  const classOptions = useTypedSelector((state) => state.classes);
  const [date, setDate] = useState(new Date(initialDate));
  const [isOpen, setOpen] = useState(false);
  const [seriesStartOpen, setSeriesStartOpen] = useState(false);
  const [seriesEndOpen, setSeriesEndOpen] = useState(false);
  const [classGroup, setClassGroup] = useState(undefined as undefined | Class);

  const [startTime, setStartTime] = useState(
    lesson
      ? `${format(new Date(lesson.start), "HH")}:${format(
          new Date(lesson.start),
          "mm"
        )}`
      : (undefined as undefined | string)
  );
  const [endTime, setEndTime] = useState(
    lesson
      ? `${format(new Date(lesson.end), "HH")}:${format(
          new Date(lesson.end),
          "mm"
        )}`
      : (undefined as undefined | string)
  );
  const [subject, updateSubject] = useState(lesson ? lesson.subject : "");

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
      <h3 style={{ margin: 0 }}>{lesson ? "Update Lesson" : "New Lesson"}</h3>
      {!lesson ? (
        <img
          style={{ margin: "20px" }}
          height="100px"
          src={process.env.PUBLIC_URL + "calendar.svg"}
          alt="New Lesson Icon"
        />
      ) : (
        <img
          style={{ margin: "20px" }}
          height="100px"
          src={process.env.PUBLIC_URL + "edit_calendar.svg"}
          alt="Update Lesson Icon"
        />
      )}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (startTime && endTime) {
            if (!lesson) {
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
                        new Date(
                          date.setHours(parseFloat(startTime))
                        ).setMinutes(parseFloat(startTime.slice(-2)))
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
            } else {
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
                    class: lesson.class,
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
        <div style={{ display: "flex", marginTop: "10px" }}>
          <Select
            style={{ color: !startTime ? "#7d7d7d" : "#000" }}
            value={options.indexOf(startTime)}
            onChange={(e) => {
              if (e.target.selectedIndex > 0)
                setStartTime(options[e.target.selectedIndex - 1]);
            }}
          >
            <option disabled={startTime ? true : false}>Start Time</option>
            {options
              .filter((_, index) => index < options.length - 1)
              .map((option, index) => (
                <option key={index} value={index}>
                  {option}
                </option>
              ))}
          </Select>
          <Select
            style={{ color: !endTime ? "#7d7d7d" : "#000" }}
            value={options.indexOf(endTime)}
            onChange={(e) => {
              if (e.target.selectedIndex > 0)
                setEndTime(options[e.target.selectedIndex - 1]);
            }}
          >
            <option disabled={endTime ? true : false}>End Time</option>
            {options.map((option, index) => (
              <option key={index} value={index}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div
          style={{ display: "flex", marginTop: "10px", alignItems: "center" }}
        >
          <Select
            style={{ color: !classGroup ? "#7d7d7d" : "#000" }}
            value={classGroup && classOptions.indexOf(classGroup)}
            onChange={(e) => {
              if (e.target.selectedIndex > 0)
                setClassGroup(classOptions[e.target.selectedIndex - 1]);
            }}
          >
            <option disabled={classGroup ? true : false}>Class</option>
            {classOptions.map((option, index) => (
              <option key={index} value={index}>
                {option.year + option.group}
              </option>
            ))}
          </Select>
          <span
            style={{
              flex: 1,
              marginLeft: "5px",
              padding: "10px",
              border: "1px solid transparent",
            }}
          >
            <label>Series</label>
            <input
              type="checkbox"
              checked={series}
              onChange={() => setSeries(!series)}
            />
          </span>
        </div>
        {series && (
          <CheckBoxContainer>
            <label>Mon</label>
            <input
              disabled={!series}
              type="checkbox"
              checked={checkboxState.monday}
              onChange={() =>
                setCheckbox((checkboxState) => ({
                  ...checkboxState,
                  monday: !checkboxState.monday,
                }))
              }
            />

            <label>Tue</label>
            <input
              type="checkbox"
              disabled={!series}
              checked={checkboxState.tuesday}
              onChange={() =>
                setCheckbox((checkboxState) => ({
                  ...checkboxState,
                  tuesday: !checkboxState.tuesday,
                }))
              }
            />

            <label>Wed</label>
            <input
              type="checkbox"
              disabled={!series}
              checked={checkboxState.wednesday}
              onChange={() =>
                setCheckbox((checkboxState) => ({
                  ...checkboxState,
                  wednesday: !checkboxState.wednesday,
                }))
              }
            />

            <label>Thu</label>
            <input
              type="checkbox"
              disabled={!series}
              checked={checkboxState.thursday}
              onChange={() =>
                setCheckbox((checkboxState) => ({
                  ...checkboxState,
                  thursday: !checkboxState.thursday,
                }))
              }
            />

            <label>Fri</label>
            <input
              type="checkbox"
              disabled={!series}
              checked={checkboxState.friday}
              onChange={() =>
                setCheckbox((checkboxState) => ({
                  ...checkboxState,
                  friday: !checkboxState.friday,
                }))
              }
            />
          </CheckBoxContainer>
        )}

        <SubmitButton
          disabled={
            !startTime ||
            !endTime ||
            !subject ||
            !classGroup ||
            !options.includes(startTime) ||
            !options.includes(endTime) ||
            (series && !lesson && !Object.values(checkboxState).includes(true))
          }
          type="submit"
        >
          {lesson ? "Update" : "Create"}
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};
