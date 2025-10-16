import type { Todo } from "../api/todos";

const TASKS_KEY = "tasks";

export const saveTasks = (tasks: Todo[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasks = (): Todo[] => {
  const data = localStorage.getItem(TASKS_KEY);
  if (!data) return [];

  try {
    const rawData = JSON.parse(data) as unknown[];
    const parsed = rawData.map((t: unknown): Todo => {
      const item = t as Record<string, unknown>;
      return {
        id: Number(item.id),
        text: String(item.text),
        completed: Boolean(item.completed),
        createdAt: new Date(item.createdAt as string).toISOString(),
      };
    });
    return parsed;
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};
