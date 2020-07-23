import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { startOfDay } from "date-fns";
import { Form, Input, Select, SubmitButton } from "./style";
import { getTimeSlots } from "../../../helpers/getTimeSlots";
import { useTypedSelector } from "../../../store";
import { Class, Lesson } from "../../../store/types";
import { actions } from "../../../store/actions";
import { DatePicker } from "../../DatePicker";
import { StartEndTime } from "./../StartEndTime";

export const NewLessonForm: React.FC<{
  initialDate: string;
  series: boolean;
  setSeries: (series: boolean) => void;
}> = ({ initialDate, series, setSeries }) => {
  const dispatch = useDispatch();
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
      <StartEndTime
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
      <ClassAndSeries
        series={series}
        classGroup={classGroup}
        setSeries={setSeries}
        setClassGroup={setClassGroup}
      />
      <SubmitButton
        disabled={!startTime || !endTime || !subject || !classGroup}
        type="submit"
      >
        Create
      </SubmitButton>
    </Form>
  );
};

export const ClassAndSeries: React.FC<{
  series: boolean;
  classGroup: Class | undefined;
  setClassGroup: React.Dispatch<React.SetStateAction<Class | undefined>>;
  setSeries: (series: boolean) => void;
}> = ({ series, classGroup, setClassGroup, setSeries }) => {
  const classOptions = useTypedSelector((state) => state.classes);
  return (
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
  );
};
