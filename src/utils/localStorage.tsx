import type { Task } from "../types";

const TASKS_KEY = "tasks";

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasks = (): Task[] => {
  const data = localStorage.getItem(TASKS_KEY);
  if (!data) return [];

  try {
    const parsed = JSON.parse(data).map((t: any) => ({
      ...t,
      createdAt: new Date(t.createdAt),
      completed: !!t.completed,
    }));
    return parsed;
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};
