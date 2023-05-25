import { ToDoItem } from "../../services/toDoItem";

export interface ToDoModalProps {
    shouldShow: boolean;
    setShouldShow: (shouldShow: boolean) => void
    toDoItem: ToDoItem;
    handler: () => void;
}