import DatePicker from "react-datepicker";
import '../../styles/components/ToDoItemDatePicker/ToDoItemDatePicker.css';

import "react-datepicker/dist/react-datepicker.css";

interface ToDoItemDatePickerProps {
    setNewToDoItemDate: (date: null | Date) => void,
    newToDoItemDate: Date | null
}

export const ToDoItemDatePicker = (props: ToDoItemDatePickerProps) => {
    return (
        <DatePicker selected={props.newToDoItemDate} onChange={(date) => props.setNewToDoItemDate(date)}
                    onSelect={(date) => props.setNewToDoItemDate(date)} showTimeSelect/>
    );

};