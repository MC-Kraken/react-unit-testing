import React, { ChangeEvent, useEffect, useState } from "react";
import { addToDoItem } from "../../services/toDoService";
import { ToDoItemAdderProps } from "./ToDoItemAdderProps";
import { ToDoItemDatePicker } from "../ToDoItemDatePicker/ToDoItemDatePicker";

export const ToDoItemAdder = ({ handleAdd, toDoList }: ToDoItemAdderProps) => {
    const [newToDoItemName, setNewToDoItemName] = useState<string>("");
    const [newToDoItemDate, setNewToDoItemDate] = useState<Date | null>(new Date());
    const [shouldShowEmptyErrorText, setShouldShowEmptyErrorText] = useState<boolean>(false);
    const [shouldShowDuplicateErrorText, setShouldShowDuplicateErrorText] = useState<boolean>(false);

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newNameValue = e.currentTarget.value;
        setNewToDoItemName(newNameValue);
    };

    const onAdd = () => {
        if (newToDoItemName === "") {
            setShouldShowEmptyErrorText(true);
            return;
        }

        if (toDoList.find(i => i.description === newToDoItemName)) {
            setShouldShowDuplicateErrorText(true);
            return;
        } else {
            setShouldShowDuplicateErrorText(false);
        }

        addToDoItem(newToDoItemName, newToDoItemDate).then((response: Response) => {
            if (response.ok) {
                handleAdd();
            }
        });
    }

    useEffect(() => {
        if (shouldShowEmptyErrorText && newToDoItemName.length > 0) {
            setShouldShowEmptyErrorText(false);
        }
    }, [newToDoItemName])

    return (
        <>
            {shouldShowEmptyErrorText && <p style={{ color: "red" }}>You must enter something</p>}
            {shouldShowDuplicateErrorText && <p style={{ color: "red" }}>You already have that on your list</p>}
            <input aria-label="todo-input" onChange={value => onNameChange(value)} /> {" "}
            <ToDoItemDatePicker setNewToDoItemDate={setNewToDoItemDate} newToDoItemDate={newToDoItemDate}/>
            <button onClick={onAdd}>Add To-Do Item</button>
        </>);
}