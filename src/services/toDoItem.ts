export interface ToDoItem {
    id: number;
    description: string;
    dueDate: Date | null;
    priority: number;
}