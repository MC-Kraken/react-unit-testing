import { ToDoItem } from "../../services/toDoItem";

export interface ToDoItemEditorProps {
    toDoItem: ToDoItem;
    handleEdit: () => void;
}