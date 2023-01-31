import { ToDoItem } from "./toDoItem";

const baseUrl = "https://localhost:7016/todoitems";

export const getToDoList = async (): Promise<ToDoItem[]> => {
    const response = await fetch(baseUrl);

    return response.json();
}

// TODO: return value?
export const addToDoItem = async (item: string, date: Date | null): Promise<Response> => {
    return await fetch(baseUrl, {
        body: JSON.stringify({
            description: item,
            dueDate: date
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }        
    });
}

export const deleteToDoItem = async (id: number): Promise<Response> => {
    return await fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    });
}