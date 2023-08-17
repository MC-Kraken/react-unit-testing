import { addCompletedToDoItem, completeToDoItem } from "../../services/toDoService";
import { ToDoListItemCompleteButtonProps } from "./ToDoListItemCompleteButtonProps";
import "../../styles/components/ToDoListItemDeleteButton/ToDoListItemDeleteButton.css"
import { ToDoItem } from "../../models/toDoItem";

export const ToDoListItemCompleteButton = ({ toDoItem, handleComplete }: ToDoListItemCompleteButtonProps) => {
    const onComplete = (toDoItem: ToDoItem) => {
        // TODO: Handle errors
        completeToDoItem(toDoItem.id)
            .then((response: Response) => {
                if (response.ok) {
                    handleComplete();
                }
            });
        addCompletedToDoItem(toDoItem).then((response: Response) => {
            if (response.ok) {
                handleComplete();
            }
        });
    };

    return (
        <button className={"complete-button"} aria-label={`complete-${toDoItem.description}-${toDoItem.id}`}
                key={`button-${toDoItem.id}`}
                onClick={() => onComplete(toDoItem)}
        ><i className="fa-solid fa-circle-check"></i></button>
    );
};