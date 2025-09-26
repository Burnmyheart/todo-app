import type { TodoGroup } from "../types";

const GROUPS_KEY = "todoGroups";

export const saveGroups = (groups: TodoGroup[]) => {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
};

export const loadGroups = (): TodoGroup[] => {
  const data = localStorage.getItem(GROUPS_KEY);
  if (!data) return [];

  const groups: TodoGroup[] = JSON.parse(data);

  // Конвертируем строки обратно в Date
  return groups.map(group => ({
    ...group,
    createdAt: new Date(group.createdAt),
    tasks: group.tasks.map(task => ({ ...task, createdAt: new Date(task.createdAt) })),
  }));
};
