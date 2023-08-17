import { ToDoItem } from "../models/toDoItem";
import { CompletedToDoItem } from "../models/completedToDoItem";

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

export const addCompletedToDoItem = async (item: ToDoItem): Promise<Response> => {
    return await fetch(`${baseUrl}/completedtodoitems`, {
        body: JSON.stringify({
            description: item.description,
            completedDate: new Date().toDateString()
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export const getCompletedToDoList = async (): Promise<CompletedToDoItem[]> => {
    const response = await fetch(`${baseUrl}/completedtodoitems`);

    return response.json();
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
    return await fetch(`${baseUrl}/todoitems/${id}`, {
        method: "DELETE"
    });
}