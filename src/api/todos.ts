import axios from "axios";

const API_URL = "http://localhost:3001";

export type TodoFilter = "all" | "active" | "completed";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
}

// Получение задач с токеном
export const fetchTodos = async (
  page: number,
  limit: number,
  filter: TodoFilter,
  token: string
) => {
  try {
    const response = await axios.get(`${API_URL}/todos`, {
      params: { page, limit, filter },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error;
  }
};

export const createTodo = async (text: string, token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/todos`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании задачи:", error);
    throw error;
  }
};

export const deleteTodo = async (id: number, token: string) => {
  try {
    await axios.delete(`${API_URL}/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    throw error;
  }
};

export const updateTodo = async (id: number, data: Partial<Todo>, token: string) => {
  try {
    const response = await axios.put(`${API_URL}/todos/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при обновлении задачи:", error);
    throw error;
  }
};

export const toggleTodo = async (id: number, token: string) => {
  try {
    const response = await axios.patch(`${API_URL}/todos/${id}/toggle`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при переключении задачи:", error);
    throw error;
  }
};
