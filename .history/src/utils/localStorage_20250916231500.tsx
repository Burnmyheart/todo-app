
import { TodoGroup } from "../types";

const STORAGE_KEY = "todoGroups";

export const saveTodoGroups = (groups: TodoGroup[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
};

export const loadTodoGroups = (): TodoGroup[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data
    ? JSON.parse(data).map((group: TodoGroup) => ({
        ...group,
        createdAt: new Date(group.createdAt),
        tasks: group.tasks.map(task => ({ ...task, createdAt: new Date(task.createdAt) })),
      }))
    : [];
};
