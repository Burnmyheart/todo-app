import { useState, useEffect } from "react";
import TodoItem from "../TodoItem/TodoItem";
import AddTodo from "../AddTodo/AddTodo";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Pagination,
  FormControl,
  Select,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { loadTodos, setFilter, setPage, setLimit } from "../../slices/todoSlice";
import { createTodo, updateTodo, toggleTodo, deleteTodo } from "../../api/todos";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function TodoList() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, filter, page, limit, totalPages } = useSelector(
    (state: RootState) => state.todos
  );


  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  useEffect(() => {
    dispatch(loadTodos());
  }, [page, limit, filter]);

  const handleAdd = async (text: string) => {
    try {
      await createTodo(text);
      dispatch(loadTodos());
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };
  
  const handleToggle = async (id: number) => {
    try {
      await toggleTodo(id);
      dispatch(loadTodos());
    } catch (error) {
      console.error("Ошибка при переключении задачи:", error);
    }
  };
  
  const handleEdit = async (id: number, text: string) => {
    try {
      await updateTodo(id, { text });
      dispatch(loadTodos());
    } catch (error) {
      console.error("Ошибка при редактировании задачи:", error);
    }
  };
  
  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      dispatch(loadTodos());
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  const filteredTasks = todos.filter(task =>
    filter === "completed" ? task.completed : filter === "active" ? !task.completed : true
  );


  const sortedTasks = [...filteredTasks].sort((a, b) =>
    sortOrder === "new"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <>
      <AddTodo onAdd={handleAdd} placeholder="Новая задача..." />

      <Stack direction="row" spacing={1} sx={{ my: 2 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, val) => val && dispatch(setFilter(val))}
          size="small"
        >
          <ToggleButton value="all">Все</ToggleButton>
          <ToggleButton value="active">Неготовые</ToggleButton>
          <ToggleButton value="completed">Готовые</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={sortOrder}
          exclusive
          onChange={(_, val) => val && setSortOrder(val)}
          size="small"
        >
          <ToggleButton value="new" aria-label="Сортировать по новым"><ArrowDownwardIcon /></ToggleButton>
          <ToggleButton value="old" aria-label="Сортировать по старым"><ArrowUpwardIcon /></ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : sortedTasks.length === 0 ? (
        <p>Нет задач</p>
      ) : (
        sortedTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={() => handleToggle(task.id)}
            onDelete={() => handleDelete(task.id)}
            onEdit={handleEdit}
          />
        ))
      )}

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => dispatch(setPage(value))}
        />

        <FormControl size="small">
          <Select value={limit} onChange={(e) => dispatch(setLimit(Number(e.target.value)))}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}
