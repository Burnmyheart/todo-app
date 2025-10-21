import axios from "axios";

const API_URL = "http://localhost:3001";

export type TodoFilter = "all" | "active" | "completed";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

export const fetchTodos = async (page: number, limit: number, filter: TodoFilter) => {
  try {
    const response = await axios.get(`${API_URL}/todos`, {
      params: { page, limit, filter },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
  }
};

export const createTodo = async (text: string) => {
  try {
    const response = await axios.post(`${API_URL}/todos`, { text });
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`);
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
  }
};

export const updateTodo = async (id: number, data: Partial<Todo>) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
  }
};

export const toggleTodo = async (id: number) => {
  try {
    const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при переключении задачи:", error);
  }
};
