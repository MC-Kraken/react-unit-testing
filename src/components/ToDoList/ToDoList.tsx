import { useEffect, useState } from "react";
import { ToDoItem } from "../../services/toDoItem";
import { getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";
import { ToDoListItem } from "../ToDoListItem/ToDoListItem";
import '../../styles/components/ToDoList/ToDoList.css';
import {DataGrid, GridColDef, GridRowsProp} from '@mui/x-data-grid';
import {Skeleton} from "@mui/material";

export const ToDoList = () => {
    const [fetchToDoItems, setFetchToDoItems] = useState<boolean>(true);
    const [toDoItems, setToDoItems] = useState<ToDoItem[]>();
    const [shouldShowCompleteMessage, setShouldShowCompleteMessage] = useState<boolean>(false);
    const [gridRows, setGridRows] = useState<GridRowsProp>([]);
    const handleCompleteModalClose = () => setShouldShowCompleteMessage(false);

    useEffect(() => {
        // TODO: Add loader
        if (fetchToDoItems) {
            // TODO: Handle errors
            getToDoList().then(response => {
                setToDoItems(response);
                createGridRows(response);
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
        const rows: GridRowsProp = toDoItems?.map((toDoItem, index) => {
            return  { id: (index+1), task: toDoItem.description, dueDate: toDoItem.dueDate,
                delete: <ToDoListItem toDoItem={toDoItem} handleDelete={() => setFetchToDoItems(true)}></ToDoListItem> }
        }) as GridRowsProp;
        setGridRows(rows);
    }



    const columns: GridColDef[] = [
        { field: 'task', headerName: 'Task', width: 150 },
        { field: 'dueDate', headerName: 'Due Date', width: 150 },
        { field: 'delete', headerName: '', width: 150 },
    ];


    return (
        <>
            <div className={"app-container"}>
                <h1 className={"header"}>To-Do List</h1>
                <ToDoItemAdder toDoList={toDoItems ?? []} handleAdd={() => setFetchToDoItems(true)} />
                {
                    toDoItems ? (
                        <DataGrid rows={[]} columns={columns} />
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