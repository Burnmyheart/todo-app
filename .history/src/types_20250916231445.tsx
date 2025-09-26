export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoGroup {
  id: number;
  title: string;       // название общей задачи
  tasks: Task[];       // список тасков внутри
  createdAt: Date;
}