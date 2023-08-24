import { ToDoItem } from "../models/toDoItem";

const baseUrl = "https://localhost:7016";

export const getToDoList = async (): Promise<ToDoItem[]> => {
    const response = await fetch(`${baseUrl}/todoitems`);

    return response.json();
}

export const addToDoItem = async (item: string, date: string | Date | null, priority: any): Promise<Response> => {
    return await fetch(`${baseUrl}/todoitems`, {
        body: JSON.stringify({
            description: item,
            dueDate: date,
            priority: priority
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }        
    });
}

export const editToDoItem = async (ops: any, id: number): Promise<Response> => {
    return await fetch(`${baseUrl}/todoitems/${id}`, {
        body: JSON.stringify(ops),
        method: "PATCH",
        headers: {
            "Content-Type": "application/json-patch+json"
        }
    });
}

export const completeToDoItem = async (id: number): Promise<Response> => {
    const now = new Date().toDateString();
    const ops = [
        {
            "op": "replace",
            "path": "/completed",
            "value": true
        },
        {
            "op": "replace",
            "path": "/completedDate",
            "value": now
        }
    ]

    return await fetch(`${baseUrl}/todoitems/${id}`, {
        body: JSON.stringify(ops),
        method: "PATCH",
        headers: {
            "Content-Type": "application/json-patch+json"
        }
    });
}