import React from "react";
import { Box, Modal } from "@mui/material";
import { ToDoModalProps } from "./ToDoModalProps";
import "../../styles/components/ToDoModal/ToDoModal.css"
import { ToDoItemEditor } from "../ToDoItemEditor/ToDoItemEditor";

export const ToDoModal = ({
                              shouldShow,
                              setShouldShow,
                              id,
                              dueDate,
                              priority,
                              description,
                              handler
                          }: ToDoModalProps) => {

    const style = {
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
        }
    };

    return (
        <Modal
            open={shouldShow}
            onClose={() => setShouldShow(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ToDoItemEditor description={description}
                                dueDate={dueDate}
                                id={id} priority={priority} handleEdit={handler} setShouldShow={setShouldShow} />
            </Box>
        </Modal>)
}