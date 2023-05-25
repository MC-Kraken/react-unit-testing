import { ToDoItemDatePicker } from "../ToDoItemDatePicker/ToDoItemDatePicker";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Selector } from "../Selector/Selector";
import { priority } from "../../enums/priority";
import React, { ChangeEvent, useState } from "react";
import { ToDoItemEditorProps } from "./ToDoItemEditorProps";
import { addToDoItem, editToDoItem } from "../../services/toDoService";

export const ToDoItemEditor = ({ toDoItem, handleEdit }: ToDoItemEditorProps) => {
    const [newToDoItemDate, setNewToDoItemDate] = useState<Date | null>(new Date());
    const [newToDoItemName, setNewToDoItemName] = useState<string>("");
    const [newToDoItemPriority, setNewToDoItemPriority] = useState<number>(priority.Low);
    const [shouldShowEmptyErrorText, setShouldShowEmptyErrorText] = useState<boolean>(false);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newNameValue = e.currentTarget.value;
        setNewToDoItemName(newNameValue);
    };

    const onEdit = () => {
        if (newToDoItemName === "") {
            setShouldShowEmptyErrorText(true);
            return;
        }

        // this service call still needs to have PATCH request implemented
        editToDoItem(newToDoItemName, newToDoItemDate, newToDoItemPriority).then((response: Response) => {
            if (response.ok) {
                handleEdit();
            }
        });

        handleEdit();
    }

    return (
        <>
            <label>Create a new to-do item</label>
            <div className={"item-input-container"}>
                <input aria-label="todo-input" onChange={value => onNameChange(value)}
                       placeholder={"Edit your to-do item"} /> {" "}
                <ToDoItemDatePicker setNewToDoItemDate={setNewToDoItemDate} newToDoItemDate={newToDoItemDate} />
                <FormControl>
                    <InputLabel>Text</InputLabel>
                    <Selector label={"Priority"} setToDoItemPriority={setNewToDoItemPriority}
                              value={toDoItem.priority} renderValue={(value: any) => priority[value]}>
                        <MenuItem value={priority.High}>High</MenuItem>
                        <MenuItem value={priority.Medium}>Medium</MenuItem>
                        <MenuItem value={priority.Low}>Low</MenuItem>
                    </Selector>
                </FormControl>
            </div>
            <button className={"add-item-button"} onClick={onEdit}>Update</button>
        </>
    )

}