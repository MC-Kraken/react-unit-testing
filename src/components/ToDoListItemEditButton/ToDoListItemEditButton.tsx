// import { editToDoItem } from "../../services/toDoService";
import { ToDoListItemEditButtonProps } from "./ToDoListItemEditButtonProps";
import { ToDoModal } from "../ToDoModal/ToDoModal";
import { useState } from "react";

export const ToDoListItemEditButton = ({ toDoItem, handleEdit }: ToDoListItemEditButtonProps) => {
    const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
    const onEdit = () => {
        setShouldShowModal(true);
    };

    return (
        <>
            <button aria-label={`edit-${toDoItem.description}-${toDoItem.id}`}
                    key={`button-${toDoItem.id}`}
                    onClick={() => onEdit()}
            ><i className="fas fa-edit"></i></button>
            <ToDoModal setShouldShow={setShouldShowModal} toDoItem={toDoItem} shouldShow={shouldShowModal} handler={handleEdit}/>
        </>
    );
};