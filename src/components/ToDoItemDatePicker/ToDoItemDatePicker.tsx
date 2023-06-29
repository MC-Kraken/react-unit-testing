import DatePicker from "react-datepicker";
import '../../styles/components/ToDoItemDatePicker/ToDoItemDatePicker.css';

import "react-datepicker/dist/react-datepicker.css";

interface ToDoItemDatePickerProps {
    setNewToDoItemDate: (date: null | Date | string) => void,
    selectedDate: string | Date | null
}

export const ToDoItemDatePicker = (props: ToDoItemDatePickerProps) => {
    return (
        <DatePicker placeholderText={"Choose a due date"} selected={props.selectedDate as Date} onChange={(date) => props.setNewToDoItemDate(date)}
                    onSelect={(date) => props.setNewToDoItemDate(date)} showTimeSelect/>
    );

};