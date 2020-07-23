import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { Lesson } from "../../store/types";
import { DatePicker } from "../DatePicker";
import { startOfDay, format, addWeeks } from "date-fns";
import {
  Form,
  Input,
  Select,
  SubmitButton,
  Wrapper,
  SeriesContainer,
} from "./style";
import { getTimeSlots } from "../../helpers/getTimeSlots";
import { useTypedSelector } from "../../store";

export const LessonForm: React.FC<{
  initialDate: string;
  lesson: Lesson;
}> = ({ initialDate, lesson }) => {
  const dispatch = useDispatch();
  const options = getTimeSlots(15, 8, 17.15);
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
    )}`
  );
  const [endTime, setEndTime] = useState(
    `${format(new Date(lesson.end), "HH")}:${format(
      new Date(lesson.end),
      "mm"
    )}`
  );
  const [subject, updateSubject] = useState(lesson.subject);
  const [series, setSeries] = useState(false);
  const [seriesStart, setSeriesStart] = useState(date);
  const [seriesEnd, setSeriesEnd] = useState(addWeeks(date, 1));

  return (
    <Wrapper>
      <h3 style={{ margin: 0 }}>Update Lesson</h3>
      <img
        style={{ margin: "20px" }}
        height="100px"
        src={process.env.PUBLIC_URL + "edit_calendar.svg"}
        alt="Update Lesson Icon"
      />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (classGroup) {
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
            selectedDate={startOfDay(date)}
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
            style={{ color: "#000" }}
            value={options.indexOf(startTime)}
            onChange={(e) => {
              if (e.target.selectedIndex > 0)
                setStartTime(options[e.target.selectedIndex - 1]);
            }}
          >
            <option disabled={!startTime}>Start Time</option>
            {options
              .filter((_, index) => index < options.length - 1)
              .map((option, index) => (
                <option key={index} value={index}>
                  {option}
                </option>
              ))}
          </Select>
          <Select
            style={{ color: "#000" }}
            value={options.indexOf(endTime)}
            onChange={(e) => {
              if (e.target.selectedIndex > 0)
                setEndTime(options[e.target.selectedIndex - 1]);
            }}
          >
            <option disabled={!endTime}>End Time</option>
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
            <option disabled={!classGroup}>Class</option>
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

        <SubmitButton
          disabled={
            !startTime ||
            !endTime ||
            !subject ||
            !classGroup ||
            !options.includes(startTime) ||
            !options.includes(endTime)
            // ||(series && !lesson && !Object.values(checkboxState).includes(true))
          }
          type="submit"
        >
          {lesson ? "Update" : "Create"}
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};
