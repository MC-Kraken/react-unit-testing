// import { editToDoItem } from "../../services/toDoService";
import { ToDoListItemEditButtonProps } from "./ToDoListItemEditButtonProps";

export const ToDoListItemEditButton = ({ toDoItem }: ToDoListItemEditButtonProps) => {
    const onEdit = (id: number) => {
        // TODO: Handle errors
        // editToDoItem(id).then((response: Response) => {
        //     if (response.ok) {
        //         handleEdit();
        //     }
        // });
    };

    return (
        <button aria-label={`edit-${toDoItem.description}-${toDoItem.id}`}
                key={`button-${toDoItem.id}`}
                onClick={() => onEdit(toDoItem.id)}
        ><i className="fa-solid fa-circle-check"></i></button>
    );
};