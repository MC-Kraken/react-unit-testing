export interface ToDoItemEditorProps {
    id: number;
    description: string;
    dueDate: string;
    priority: any;
    setShouldShow: (shouldShow: boolean) => void;
    handleEdit: () => void;
}