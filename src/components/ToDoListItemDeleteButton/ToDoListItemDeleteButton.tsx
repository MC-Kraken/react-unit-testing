import { deleteToDoItem } from "../../services/toDoService";
import { ToDoListItemDeleteButtonProps } from "./ToDoListItemDeleteButtonProps";
import "../../styles/components/ToDoListItemDeleteButton/ToDoListItemDeleteButton.css"

export const ToDoListItemDeleteButton = ({toDoItem, handleDelete} : ToDoListItemDeleteButtonProps) => {
    const onDelete = (id: number) => {
        // TODO: Handle errors
        deleteToDoItem(id).then((response: Response) => {
            if (response.ok) {
                handleDelete();
            }
        });
    };

    return (
        <button className={"delete-button"} aria-label={`delete-${toDoItem.description}-${toDoItem.id}`}
                key={`button-${toDoItem.id}`}
                onClick={() => onDelete(toDoItem.id)}
        ><i className="fa-solid fa-circle-check"></i> </button>
    );
};