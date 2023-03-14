import { useEffect, useState } from "react";
import { ToDoItem } from "../../services/toDoItem";
import { getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";
import '../../styles/components/ToDoList/ToDoList.css';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Skeleton } from "@mui/material";
import { ToDoListItemDeleteButton } from "../ToDoListItemDeleteButton/ToDoListItemDeleteButton";

export const ToDoList = () => {
    const [fetchToDoItems, setFetchToDoItems] = useState<boolean>(true);
    const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);
    const [shouldShowCompleteMessage, setShouldShowCompleteMessage] = useState<boolean>(false);
    const handleCompleteModalClose = () => setShouldShowCompleteMessage(false);

    useEffect(() => {
        // TODO: Add loader
        if (fetchToDoItems) {
            // TODO: Handle errors
            getToDoList().then(response => {
                setToDoItems(response);
            })
            setFetchToDoItems(false);
        }
    }, [fetchToDoItems]);

    useEffect(() => {
        if (toDoItems?.length === 0) {
            setShouldShowCompleteMessage(true)
        }
    }, [toDoItems])


    function createGridRows(toDoItems: ToDoItem[]) {
        return toDoItems?.map((toDoItem, index) => {
            return {
                id: (index + 1), task: toDoItem.description, dueDate: toDoItem.dueDate,
                delete: toDoItem
            }
        }) as GridRowsProp;
    }


    const columns: GridColDef[] = [
        { field: 'task', headerName: 'Task', width: 150 },
        { field: 'dueDate', headerName: 'Due Date', width: 150 },
        { field: 'delete', headerName: '', width: 150, renderCell: (params) => <ToDoListItemDeleteButton toDoItem={params.value} handleDelete={() => setFetchToDoItems(true)} /> },
    ];


    return (
        <>
            <div className={"app-container"}>
                <h1 className={"header"}>To-Do List</h1>
                <ToDoItemAdder toDoList={toDoItems ?? []} handleAdd={() => setFetchToDoItems(true)} />
                {
                    toDoItems.length > 0 ? (
                        <DataGrid autoHeight={true} rows={createGridRows(toDoItems)} columns={columns} />
                    ) : (
                        <Skeleton variant="rectangular" width={210} height={118} />
                    )
                }
            </div>
            <hr />
            <h3>Number of To-Do List items: {toDoItems?.length}</h3>
            {shouldShowCompleteMessage && <div>
                <p>You did everything on your list!</p>
                <button onClick={handleCompleteModalClose}>OK</button>
            </div>}
        </>

    );
}