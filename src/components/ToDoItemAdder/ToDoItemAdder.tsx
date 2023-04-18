import React, {ChangeEvent, useEffect, useState} from "react";
import {addToDoItem} from "../../services/toDoService";
import {ToDoItemAdderProps} from "./ToDoItemAdderProps";
import {ToDoItemDatePicker} from "../ToDoItemDatePicker/ToDoItemDatePicker";
import '../../styles/components/ToDoItemAdder/ToDoItemAdder.css';
import {Selector} from "../Selector/Selector";
import {FormControl, InputLabel, MenuItem} from "@mui/material";
import {priority} from "../../enums/priority";

export const ToDoItemAdder = ({handleAdd, toDoList}: ToDoItemAdderProps) => {
    const [newToDoItemName, setNewToDoItemName] = useState<string>("");
    const [newToDoItemDate, setNewToDoItemDate] = useState<Date | null>(new Date());
    const [newToDoItemPriority, setNewToDoItemPriority] = useState<number>(priority.Low);
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

        addToDoItem(newToDoItemName, newToDoItemDate, newToDoItemPriority).then((response: Response) => {
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
            {shouldShowEmptyErrorText && <p style={{color: "red"}}>You must enter something</p>}
            {shouldShowDuplicateErrorText && <p style={{color: "red"}}>You already have that on your list</p>}
            <label>Create a new to-do item</label>
            <div className={"item-input-container"}>
                <input aria-label="todo-input" onChange={value => onNameChange(value)}
                       placeholder={"Enter new to-do item"}/> {" "}
                <ToDoItemDatePicker setNewToDoItemDate={setNewToDoItemDate} newToDoItemDate={newToDoItemDate}/>
                <FormControl>
                    <InputLabel>Text</InputLabel>
                    <Selector label={"Priority"}
                              setToDoItemPriority={setNewToDoItemPriority}
                              renderValue={(value: number) =>  priority[value]}>
                        <MenuItem value={priority.High}>High</MenuItem>
                        <MenuItem value={priority.Medium}>Medium</MenuItem>
                        <MenuItem value={priority.Low}>Low</MenuItem>
                    </Selector>
                </FormControl>
            </div>
            <button className={"add-item-button"} onClick={onAdd}>Add To-Do Item</button>
        </>);
}