import { ToDoItem } from "../../services/toDoItem";

export interface ToDoListItemEditButtonProps
{
    toDoItem: ToDoItem;
    handleEdit: () => void;
}