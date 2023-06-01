export interface ToDoListItemEditButtonProps
{
    id: number;
    description: string;
    dueDate: string;
    priority: any;
    handleEdit: () => void;
}