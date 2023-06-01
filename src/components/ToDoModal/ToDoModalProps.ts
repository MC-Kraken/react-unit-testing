export interface ToDoModalProps {
    shouldShow: boolean;
    setShouldShow: (shouldShow: boolean) => void
    id: number;
    description: string;
    dueDate: string;
    priority: any;
    handler: () => void;
}