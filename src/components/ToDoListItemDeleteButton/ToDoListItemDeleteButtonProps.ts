import { ToDoItem } from "../../services/toDoItem";

export interface ToDoListItemDeleteButtonProps {
    toDoItem: ToDoItem;
    handleDelete: () => void;
}