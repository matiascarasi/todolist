export type TaskCreateSchema = {
    title: string;
    content?: string;
    dueDate?: Date;
}

export type TaskCompleteSchema = {
    isDone: boolean;
}