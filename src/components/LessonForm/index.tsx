import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { Lesson } from "../../store/types";
import { v4 as uuidv4 } from "uuid";
import { useTypedSelector } from "../../store";
import { DatePicker } from "../DatePicker";
import { startOfDay } from "date-fns";
import { Form, Input, Select, SubmitButton, Wrapper } from "./style";
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
    <Wrapper>
      <h3 style={{ margin: 0 }}>New Lesson</h3>
      <img
        style={{ margin: "20px" }}
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
        <DatePicker
          close={() => setOpen(false)}
          setOpen={setOpen}
          isOpen={isOpen}
          changeDate={(date) => setDate(startOfDay(date))}
          selectedDate={startOfDay(date ? date : new Date(currentDate))}
          singleClick
        />
        <Input placeholder="Subject"></Input>
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
          Add Lesson
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};
