import React, { useState } from "react";
import { Header, AddButton, ResetButton } from "./style";
import { useDispatch } from "react-redux";
import { Popup } from "../../Popup";
import { LessonForm } from "../../LessonForm";
import { FaUndo, FaPlus } from "react-icons/fa";
import { DatePicker } from "../../DatePicker";
import { actions } from "../../../store/actions";
import { startOfDay, isSameDay } from "date-fns";
import { useKeyboardEvent } from "../../../hooks/useKeyboardEvent";
import { useTypedSelector } from "../../../store";

export const TimelineHeader: React.FC<{
  selectedDate: string;
}> = React.memo(({ selectedDate }) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [isVisible, setVisibility] = useState(false);
  const initialDate = useTypedSelector((state) => state.selectedDate);
  useKeyboardEvent("Escape", () => {
    setOpen(false);
  });
  return (
    <Header>
      <Popup
        isVisible={isVisible}
        onClick={() => {
          setVisibility(false);
        }}
        scrollLock
      >
        <LessonForm initialDate={initialDate} />
      </Popup>
      <h1>Availability</h1>
      <span>
        <DatePicker
          close={() => setOpen(false)}
          setOpen={setOpen}
          isOpen={isOpen}
          changeDate={(date) =>
            dispatch(actions.selectedDayChanged(startOfDay(new Date(date))))
          }
          selectedDate={new Date(selectedDate)}
        />
        <ResetButton
          onClick={() =>
            !isSameDay(new Date(selectedDate), new Date())
              ? dispatch(actions.selectedDayChanged(startOfDay(new Date())))
              : void {}
          }
          title="Reset date to present"
        >
          <FaUndo />
        </ResetButton>
        <AddButton onClick={() => setVisibility(true)} title="Add lesson">
          <FaPlus />
        </AddButton>
      </span>
    </Header>
  );
});
