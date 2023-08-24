export interface ToDoItem {
    id: number;
    description: string;
    dueDate: Date | null;
    priority: any;
    completed: boolean;
    completedDate: Date | null;
}