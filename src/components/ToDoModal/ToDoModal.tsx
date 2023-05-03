import React from "react";
import { Box, Modal, Typography } from "@mui/material";
import { ToDoModalProps } from "./ToDoModalProps";

export const ToDoModal = ({shouldShow, setShouldShow}: ToDoModalProps) => {

    const style = {
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
        }};

    return (<Modal
        open={shouldShow}
        onClose={() => setShouldShow(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
        </Box>
    </Modal>)
}