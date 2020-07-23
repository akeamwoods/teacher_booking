import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { startOfDay } from "date-fns";
import { Wrapper, Form, Input, SubmitButton } from "./style";
import { Class, Lesson } from "../../../store/types";
import { actions } from "../../../store/actions";
import { DatePicker } from "../../DatePicker";
import { StartEndTime } from "../Controls/StartEndTime";
import { ClassAndSeriesControls } from "../Controls/ClassAndSeries";

export const NewLessonForm: React.FC<{
  initialDate: string;
}> = ({ initialDate }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date(initialDate));
  const [isOpen, setOpen] = useState(false);
  const [classGroup, setClassGroup] = useState(undefined as undefined | Class);
  const [startTime, setStartTime] = useState(undefined as undefined | string);
  const [endTime, setEndTime] = useState(undefined as undefined | string);
  const [subject, updateSubject] = useState("");
  return (
    <Wrapper>
      <h3 style={{ margin: 0 }}>New Lesson</h3>
      <img
        style={{ margin: "20px" }}
        height="100px"
        src={process.env.PUBLIC_URL + "calendar.svg"}
        alt="New Lesson Icon"
      />
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
        <ClassAndSeriesControls
          classGroup={classGroup}
          setClassGroup={setClassGroup}
        />
        <SubmitButton
          disabled={!startTime || !endTime || !subject || !classGroup}
          type="submit"
        >
          Create
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};
