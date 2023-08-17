import { ToDoItem } from "../../models/toDoItem";

export interface ToDoListItemCompleteButtonProps {
    toDoItem: ToDoItem;
    handleComplete: () => void;
}