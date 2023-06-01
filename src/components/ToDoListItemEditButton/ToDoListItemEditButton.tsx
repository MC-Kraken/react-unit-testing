import { ToDoListItemEditButtonProps } from "./ToDoListItemEditButtonProps";
import { ToDoModal } from "../ToDoModal/ToDoModal";
import { useState } from "react";

export const ToDoListItemEditButton = ({ id, dueDate, priority, description, handleEdit }: ToDoListItemEditButtonProps) => {
    const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);
    const onEdit = () => {
        setShouldShowModal(true);
    };

    return (
        <>
            <button aria-label={`edit-${description}-${id}`}
                    key={`button-${id}`}
                    onClick={() => onEdit()}
            ><i className="fas fa-edit"></i></button>
            <ToDoModal setShouldShow={setShouldShowModal} id={id}
                       dueDate={dueDate}
                       description={description}
                       priority={priority}
                       shouldShow={shouldShowModal} handler={handleEdit} />
        </>
    );
};