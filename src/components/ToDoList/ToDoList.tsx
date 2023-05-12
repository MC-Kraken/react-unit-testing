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
import { ToDoModal } from "../ToDoModal/ToDoModal";


export const ToDoList = () => {
    const [fetchToDoItems, setFetchToDoItems] = useState<boolean>(true);
    const [toDoItems, setToDoItems] = useState<ToDoItem[]>([]);
    const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);

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
        console.log("you clicked me");
        setShouldShowModal(true);
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
            renderCell: (params) => <ToDoListItemEditButton toDoItem={params.value}
                                                            handleEdit={() => handleEdit()}/>
        },
    ];

    return (
        <>
            <div className={"app-container"}>
                <h1 className={"header"}>To-Do List</h1>
                <ToDoItemAdder buttonText={"Add ToDo Item"} toDoList={toDoItems ?? []} handleAdd={() => setFetchToDoItems(true)} />
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
        </>
    );
}