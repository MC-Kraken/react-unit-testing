// import { editToDoItem } from "../../services/toDoService";
import { ToDoListItemEditButtonProps } from "./ToDoListItemEditButtonProps";

export const ToDoListItemEditButton = ({ toDoItem, handleEdit }: ToDoListItemEditButtonProps) => {
    const onEdit = (id: number) => {
        // TODO: Handle errors
        handleEdit();
        // editToDoItem(id).then((response: Response) => {
        //     if (response.ok) {
        //
        //     }
        // });
    };

    return (
        <button aria-label={`edit-${toDoItem.description}-${toDoItem.id}`}
                key={`button-${toDoItem.id}`}
                onClick={() => onEdit(toDoItem.id)}
        ><i className="fas fa-edit"></i></button>
    );
};