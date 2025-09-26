import type { TodoType } from "../types";

const TODOS_KEY = "todos";

export const saveTodos = (todos: TodoType[]) => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
};

export const loadTodos = (): TodoType[] => {
  const data = localStorage.getItem(TODOS_KEY);
  return data ? JSON.parse(data) : [];
};
