import { ToDoItem } from "./toDoItem";

const baseUrl = "https://localhost:7016/todoitems";

export const getToDoList = async (): Promise<ToDoItem[]> => {
    const response = await fetch(baseUrl);

    return response.json();
}

export const addToDoItem = async (item: string, date: string | Date | null, priority: any): Promise<Response> => {
    return await fetch(baseUrl, {
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
    return await fetch(`${baseUrl}/${id}`, {
        body: JSON.stringify(ops),
        method: "PATCH",
        headers: {
            "Content-Type": "application/json-patch+json"
        }
    });
}

export const deleteToDoItem = async (id: number): Promise<Response> => {
    return await fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    });
}