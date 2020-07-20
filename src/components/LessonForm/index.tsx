import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { Lesson } from "../../store/types";
import { v4 as uuidv4 } from "uuid";
import { useTypedSelector } from "../../store";
import { DatePicker } from "../DatePicker";
import { DatePickerButton } from "../DatePicker/DatePickerButton";
import { startOfDay } from "date-fns";
import { Form, Select, Span, SubmitButton } from "./style";
import { getTimeSlots } from "../../helpers/getTimeSlots";

export const LessonForm = () => {
  const dispatch = useDispatch();
  const currentDate = useTypedSelector((state) => state.selectedDate);
  const options = getTimeSlots(15, 8, 17.15);
  const [date, setDate] = useState(new Date(currentDate));
  const [isOpen, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(undefined as undefined | string);
  const [endTime, setEndTime] = useState(undefined as undefined | string);

  return (
    <div
      style={{
        padding: "20px",
        margin: "1px",
        display: "flex",
        flexDirection: "column",
        minWidth: "300px",
      }}
      onClick={() => (isOpen ? setOpen(false) : void {})}
    >
      <h3 style={{ margin: 0 }}>New Lesson</h3>
      <img
        style={{ margin: "10px" }}
        height="100px"
        src={process.env.PUBLIC_URL + "calendar.svg"}
        alt="Avatar"
      />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (startTime && endTime)
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
                subject: "Latin",
                teacherId: "01",
              } as Lesson)
            );
        }}
      >
        <Span>
          <DatePickerButton
            selectedDate={date ? date : new Date(currentDate)}
            onClick={() => {
              setOpen(!isOpen);
            }}
          />
          {isOpen && (
            <DatePicker
              close={() => setOpen(false)}
              changeDate={(date) => setDate(startOfDay(date))}
              selectedDate={startOfDay(date ? date : new Date(currentDate))}
            />
          )}
        </Span>
        <Select
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
          Add Lesson
        </SubmitButton>
      </Form>
    </div>
  );
};
