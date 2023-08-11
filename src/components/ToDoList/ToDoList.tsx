import { useEffect, useState } from "react";
import { ToDoItem } from "../../services/toDoItem";
import { getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";
import '../../styles/components/ToDoList/ToDoList.css';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Skeleton } from "@mui/material";
import { ToDoListItemDeleteButton } from "../ToDoListItemDeleteButton/ToDoListItemDeleteButton";
import { days, months } from "../../enums/dates";
import { ToDoListItemEditButton } from "../ToDoListItemEditButton/ToDoListItemEditButton";

export const ToDoList = () => {
    const [fetchToDoItems, setFetchToDoItems] = useState<boolean>(true);
    const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);

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

    function formatDate(dueDate: Date | null) {
        let formattedDate = new Date(dueDate!.toString());
        return `${days[formattedDate.getDay()]} ${months[formattedDate.getMonth()]} ${formattedDate.getDate()}`;
    }

    function handleEdit() {
        setFetchToDoItems(true);
    }

    function createGridRows(toDoItems: ToDoItem[]) {
        return toDoItems?.map((toDoItem, index) => {
            return {
                id: (index + 1),
                task: toDoItem.description,
                dueDate: formatDate(toDoItem.dueDate),
                priority: toDoItem.priority,
                delete: toDoItem,
                edit: toDoItem
            }
        }) as GridRowsProp;
    }

    const columns: GridColDef[] = [
        { field: 'task', headerName: 'Task', width: 250 },
        { field: 'dueDate', headerName: 'Due Date', width: 250 },
        { field: 'priority', headerName: 'Priority', width: 250 },
        {
            field: 'delete',
            headerName: '',
            width: 150,
            renderCell: (params) => <ToDoListItemDeleteButton toDoItem={params.value}
                                                              handleDelete={() => setFetchToDoItems(true)} />
        },
        {
            field: 'edit',
            headerName: '',
            width: 150,
            renderCell: (params) => <ToDoListItemEditButton id={params.value.id} priority={params.value.priority}
                                                            description={params.value.description}
                                                            dueDate={params.value.dueDate}
                                                            handleEdit={() => handleEdit()} />
        },
    ];

    function createGridRowsCompleted(toDoItems: ToDoItem[]) {
        return toDoItems?.map((toDoItem, index) => {
            return {
                id: (index + 1),
                task: toDoItem.description,
                dueDate: formatDate(toDoItem.dueDate),
            }
        }) as GridRowsProp;
    }

    const columnsCompleted: GridColDef[] = [
        { field: 'task', headerName: 'Task', width: 250 },
        { field: 'dueDate', headerName: 'Due Date', width: 250 },
    ];

    return (
        <>
            <div className={"app-container"}>
                <h1 className={"header"}>To-Do List</h1>
                <ToDoItemAdder buttonText={"Add To-Do Item"} toDoList={toDoItems ?? []}
                               handleAdd={() => setFetchToDoItems(true)} />
                {
                    toDoItems.length > 0 ? (
                        <DataGrid autoHeight={true} rows={createGridRows(toDoItems)} columns={columns} />
                    ) : (
                        <Skeleton variant="rectangular" width={210} height={118} />
                    )
                }
                {//TODO: add new service call that fetches completed todos
                    // on complete, write completed todos to new table. Update service method
                }
                <DataGrid autoHeight={true} columns={columnsCompleted} rows={createGridRowsCompleted(toDoItems)} />
            </div>
            <hr />
            <h3>Number of To-Do List items: {toDoItems?.length}</h3>
        </>
    );
}