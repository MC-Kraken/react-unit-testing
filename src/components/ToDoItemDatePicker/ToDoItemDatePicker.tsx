import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const ToDoItemDatePicker = (setNewToDoItemDate: any) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    return (
        <DatePicker selected={startDate} onChange={(date) => {
            setNewToDoItemDate(date);
            setStartDate(date);
        }} />
    );
};