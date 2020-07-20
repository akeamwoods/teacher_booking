import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store/actions";
import { Lesson } from "../../store/types";
import { v4 as uuidv4 } from "uuid";
import { useTypedSelector } from "../../store";
import { DatePicker } from "../DatePicker";
import { DatePickerButton } from "../DatePicker/DatePickerButton";
import { startOfDay } from "date-fns";

export const LessonForm = () => {
  const currentDate = useTypedSelector((state) => state.selectedDate);
  const dispatch = useDispatch();

  const createTimeSlots = (
    interval: number,
    startTime: number,
    endTime: number
  ): any[] => {
    const times = [];
    let start = startTime * 60;

    for (var i = 0; start < endTime * 60; i++) {
      var hh = Math.floor(start / 60); // hours of day in 0-24 format
      var mm = start % 60; // minutes of the hour in 0-55 format
      times[i] = ("0" + hh).slice(-2) + ":" + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
      start = start + interval;
    }

    return times;
  };
  const options = createTimeSlots(15, 8, 17);
  const [date, setDate] = useState(new Date(currentDate));
  const [isOpen, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(options[0]);
  const [endTime, setEndTime] = useState(options[4]);

  return (
    <div
      style={{
        padding: "20px",
        margin: "1px",
        display: "flex",
        flexDirection: "column",
        minWidth: "300px",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Add a New Lesson</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
        <DatePickerButton
          selectedDate={date ? date : new Date(currentDate)}
          onClick={() => setOpen(!isOpen)}
        />
        {isOpen && (
          <DatePicker
            close={() => setOpen(false)}
            changeDate={(date) => setDate(startOfDay(date))}
            selectedDate={startOfDay(date ? date : new Date(currentDate))}
          />
        )}
        <select
          value={options.indexOf(startTime)}
          onChange={(e) => {
            setStartTime(options[e.target.selectedIndex]);
          }}
        >
          {options.map((option, index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
        </select>
        <select
          value={options.indexOf(endTime)}
          onChange={(e) => {
            setEndTime(options[e.target.selectedIndex]);
          }}
        >
          {options.map((option, index) => (
            <option key={index} value={index}>
              {option}
            </option>
          ))}
        </select>
        <button type="submit">Add Lesson</button>
      </form>
    </div>
  );
};
