import { ToDoItemDatePicker } from "../ToDoItemDatePicker/ToDoItemDatePicker";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Selector } from "../Selector/Selector";
import { toDoItemPriority } from "../../enums/toDoItemPriority";
import React, { ChangeEvent, useState } from "react";
import { ToDoItemEditorProps } from "./ToDoItemEditorProps";
import { editToDoItem } from "../../services/toDoService";

export const ToDoItemEditor = ({ id, dueDate, priority, description, handleEdit, setShouldShow }: ToDoItemEditorProps) => {
    const [newToDoItemDate, setNewToDoItemDate] = useState<Date | string | null>(dueDate);
    const [newToDoItemDescription, setNewToDoItemDescription] = useState<string>(description);
    const [newToDoItemPriority, setNewToDoItemPriority] = useState<number>(priority);
    const [shouldShowEmptyErrorText, setShouldShowEmptyErrorText] = useState<boolean>(false);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newNameValue = e.currentTarget.value;
        setNewToDoItemDescription(newNameValue);
    };

    const onEdit = () => {
        if (newToDoItemDescription === "") {
            setShouldShowEmptyErrorText(true);
            return;
        }

        const ops = [];
        if (newToDoItemDescription !== description) {
            const op = {
                "op": "replace",
                "path": "/description",
                "value": newToDoItemDescription
            };
            ops.push(op);
        }

        if (newToDoItemDate !== dueDate && newToDoItemDate !== null) {
            const op = {
                "op": "replace",
                "path": "/dueDate",
                "value": new Date(newToDoItemDate)
            };
            ops.push(op);
        }

        if (newToDoItemPriority !== priority) {
            const op = {
                "op": "replace",
                "path": "/priority",
                "value": newToDoItemPriority
            };
            ops.push(op);
        }

        editToDoItem(ops, id).then((response: Response) => {
            if (response.ok) {
                handleEdit();
                setShouldShow(false);
            }
        });

        handleEdit();
    }

    return (
        <>
            <label>Create a new to-do item</label>
            <div className={"item-input-container"}>
                <input aria-label="todo-input" onChange={value => onNameChange(value)}
                       placeholder={"Edit your to-do item"} value={newToDoItemDescription} /> {" "}
                <ToDoItemDatePicker setNewToDoItemDate={setNewToDoItemDate} selectedDate={new Date(newToDoItemDate!)} />
                <FormControl>
                    <InputLabel>Text</InputLabel>
                    <Selector label={"Priority"} setToDoItemPriority={setNewToDoItemPriority}
                              value={priority} renderValue={(value: any) => toDoItemPriority[value]}>
                        <MenuItem value={toDoItemPriority.High}>High</MenuItem>
                        <MenuItem value={toDoItemPriority.Medium}>Medium</MenuItem>
                        <MenuItem value={toDoItemPriority.Low}>Low</MenuItem>
                    </Selector>
                </FormControl>
            </div>
            <button className={"add-item-button"} onClick={onEdit}>Update</button>
        </>
    )

}