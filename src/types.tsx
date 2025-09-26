export interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoGroup {
  id: number;
  title: string;
  tasks: Task[];
  createdAt: Date;
}
