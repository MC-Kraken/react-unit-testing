import { useEffect, useState } from "react";
import { ToDoItem } from "../../models/toDoItem";
import { getCompletedToDoList, getToDoList } from "../../services/toDoService";
import { ToDoItemAdder } from "../ToDoItemAdder/ToDoItemAdder";
import '../../styles/components/ToDoList/ToDoList.css';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Skeleton } from "@mui/material";
import { ToDoListItemCompleteButton } from "../ToDoListItemCompleteButton/ToDoListItemCompleteButton";
import { days, months } from "../../enums/dates";
import { ToDoListItemEditButton } from "../ToDoListItemEditButton/ToDoListItemEditButton";
import { CompletedToDoItem } from "../../models/completedToDoItem";

export const ToDoList = () => {
    // TODO: duplicate setFetchToDoItems for completed items, so they refresh
    const [fetchToDoItems, setFetchToDoItems] = useState<boolean>(true);
    const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);
    const [completedToDoItems, setCompletedToDoItems] = useState<CompletedToDoItem[]>([]);

    useEffect(() => {
        // TODO: Add loader
        if (fetchToDoItems) {
            // TODO: Handle errors
            getToDoList().then(response => {
                setToDoItems(response);
            })
            getCompletedToDoList().then(response => {
                setCompletedToDoItems(response);
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
            renderCell: (params) => <ToDoListItemCompleteButton toDoItem={params.value}
                                                                handleComplete={() => setFetchToDoItems(true)} />
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

    function createGridRowsCompleted(toDoItems: CompletedToDoItem[]) {
        return toDoItems?.map((toDoItem, index) => {
            return {
                id: (index + 1),
                task: toDoItem.description,
                dueDate: toDoItem.completedDate != null ? formatDate(toDoItem.completedDate) : null,
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
                <DataGrid autoHeight={true} columns={columnsCompleted} rows={createGridRowsCompleted(completedToDoItems)} />
            </div>
            <hr />
            <h3>Number of To-Do List items: {toDoItems?.length}</h3>
        </>
    );
}