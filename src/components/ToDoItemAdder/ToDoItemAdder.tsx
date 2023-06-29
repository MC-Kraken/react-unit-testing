import React, { ChangeEvent, useEffect, useState } from "react";
import { addToDoItem } from "../../services/toDoService";
import { ToDoItemAdderProps } from "./ToDoItemAdderProps";
import { ToDoItemDatePicker } from "../ToDoItemDatePicker/ToDoItemDatePicker";
import '../../styles/components/ToDoItemAdder/ToDoItemAdder.css';
import { Selector } from "../Selector/Selector";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { toDoItemPriority } from "../../enums/toDoItemPriority";

export const ToDoItemAdder = ({ handleAdd, toDoList, buttonText }: ToDoItemAdderProps) => {
    const [newToDoItemDescription, setNewToDoItemDescription] = useState<string>("");
    const [newToDoItemDate, setNewToDoItemDate] = useState<Date | null | string>(null);
    const [newToDoItemPriority, setNewToDoItemPriority] = useState<number>(toDoItemPriority.Low);
    const [shouldShowEmptyErrorText, setShouldShowEmptyErrorText] = useState<boolean>(false);
    const [shouldShowDuplicateErrorText, setShouldShowDuplicateErrorText] = useState<boolean>(false);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newNameValue = e.currentTarget.value;
        setNewToDoItemDescription(newNameValue);
    };

    const onAdd = () => {
        if (newToDoItemDescription === "") {
            setShouldShowEmptyErrorText(true);
            return;
        }

        if (toDoList.find(i => i.description === newToDoItemDescription)) {
            setShouldShowDuplicateErrorText(true);
            return;
        } else {
            setShouldShowDuplicateErrorText(false);
        }

        addToDoItem(newToDoItemDescription, newToDoItemDate, newToDoItemPriority).then((response: Response) => {
            if (response.ok) {
                handleAdd();
            }
        });
    }

    useEffect(() => {
        if (shouldShowEmptyErrorText && newToDoItemDescription.length > 0) {
            setShouldShowEmptyErrorText(false);
        }
    }, [newToDoItemDescription])

    return (
        <>
            {shouldShowEmptyErrorText && <p style={{ color: "red" }}>You must enter something</p>}
            {shouldShowDuplicateErrorText && <p style={{ color: "red" }}>You already have that on your list</p>}
            <label>Create a new to-do item</label>
            <div className={"item-input-container"}>
                <input aria-label="todo-input" onChange={value => onNameChange(value)}
                       placeholder={"Enter new to-do item"} /> {" "}
                <ToDoItemDatePicker setNewToDoItemDate={setNewToDoItemDate} selectedDate={newToDoItemDate} />
                <FormControl>
                    <InputLabel>Text</InputLabel>
                    <Selector label={"Priority"} setToDoItemPriority={setNewToDoItemPriority}
                              value={newToDoItemPriority} renderValue={(value: any) => toDoItemPriority[value]}>
                        <MenuItem value={toDoItemPriority.High}>High</MenuItem>
                        <MenuItem value={toDoItemPriority.Medium}>Medium</MenuItem>
                        <MenuItem value={toDoItemPriority.Low}>Low</MenuItem>
                    </Selector>
                </FormControl>
            </div>
            <button className={"add-item-button"} onClick={onAdd}>{buttonText}</button>
        </>
    );
}