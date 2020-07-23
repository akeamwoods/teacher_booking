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
} from "./style";
import { getTimeSlots } from "../../helpers/getTimeSlots";
import { useTypedSelector } from "../../store";
import { MultiCheckbox } from "./MultiCheckbox";

export const NewLessonForm: React.FC<{
  initialDate: string;
  series: boolean;
  setSeries: (series: boolean) => void;
}> = ({ initialDate, series, setSeries }) => {
  const dispatch = useDispatch();
  const options = getTimeSlots(15, 8, 17.15);
  const classOptions = useTypedSelector((state) => state.classes);
  const [date, setDate] = useState(new Date(initialDate));
  const [isOpen, setOpen] = useState(false);
  const [classGroup, setClassGroup] = useState(undefined as undefined | Class);
  const [startTime, setStartTime] = useState(undefined as undefined | string);
  const [endTime, setEndTime] = useState(undefined as undefined | string);
  const [subject, updateSubject] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (startTime && endTime && classGroup) {
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

      <div style={{ display: "flex", marginTop: "10px", alignItems: "center" }}>
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

      <SubmitButton
        disabled={
          !startTime ||
          !endTime ||
          !subject ||
          !classGroup ||
          !options.includes(startTime) ||
          !options.includes(endTime)
        }
        type="submit"
      >
        Create
      </SubmitButton>
    </Form>
  );
};
