import { ToDoItem } from "../../models/toDoItem";

export interface ToDoItemAdderProps {
   toDoList: ToDoItem[];
   handleAdd: () => void;
   buttonText: string;
}