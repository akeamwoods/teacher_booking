import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { Lesson, Student } from "../../store/types";
import { v4 as uuidv4 } from "uuid";
import { DatePicker } from "../DatePicker";
import { startOfDay } from "date-fns";
import { Form, Input, Select, SubmitButton, Wrapper } from "./style";
import { getTimeSlots } from "../../helpers/getTimeSlots";

export const LessonForm: React.FC<{
  initialDate: string;
  id?: string;
  initialSubject?: string;
  start?: string;
  end?: string;
  color?: string;
  students?: Student[];
}> = ({
  initialDate,
  id,
  initialSubject,
  start,
  end,
  color,
  students = [],
}) => {
  const dispatch = useDispatch();
  const options = getTimeSlots(15, 8, 17.15);
  const [date, setDate] = useState(new Date(initialDate));
  const [isOpen, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(
    start ? start : (undefined as undefined | string)
  );
  const [endTime, setEndTime] = useState(
    end ? end : (undefined as undefined | string)
  );
  const [subject, updateSubject] = useState(
    initialSubject ? initialSubject : ""
  );
  return (
    <Wrapper>
      <h3 style={{ margin: 0 }}>{id ? "Update Lesson" : "New Lesson"}</h3>
      {!id ? (
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
            if (!id) {
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
                } as Lesson)
              );
            } else {
              dispatch(
                actions.lessonEdited({
                  lesson: {
                    id,
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
                    color: color!,
                    students,
                  },
                  oldKey: initialDate,
                })
              );
            }
          }
        }}
      >
        <DatePicker
          close={() => setOpen(false)}
          setOpen={setOpen}
          isOpen={isOpen}
          changeDate={(date) => setDate(startOfDay(date))}
          selectedDate={startOfDay(date ? date : new Date(initialDate))}
          singleClick
        />
        <Input
          placeholder="Subject"
          value={subject}
          onChange={(e) => updateSubject(e.target.value)}
        ></Input>
        <span style={{ display: "flex" }}>
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
        </span>
        <SubmitButton
          disabled={
            !startTime ||
            !endTime ||
            !options.includes(startTime) ||
            !options.includes(endTime)
            // || parseFloat(startTime) >= parseFloat(endTime)
          }
          type="submit"
        >
          {id ? "Update" : "Create"}
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};
