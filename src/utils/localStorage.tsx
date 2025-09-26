import type { TodoGroup } from "../types";

const GROUPS_KEY = "todoGroups";

export const saveGroups = (groups: TodoGroup[]) => {
  localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
};

export const loadGroups = (): TodoGroup[] => {
  const data = localStorage.getItem(GROUPS_KEY);
  return data ? JSON.parse(data, (key, value) => {
    if (key === "createdAt") return new Date(value);
    return value;
  }) : [];
};
