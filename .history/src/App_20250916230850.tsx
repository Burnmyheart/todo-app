import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const App: React.FC = () => {
  // ...состояния и todo как раньше
  const [sortOrder, setSortOrder] = useState<"new" | "old">("new");

  const toggleSortOrder = () => {
    setSortOrder(prev => (prev === "new" ? "old" : "new"));
  };

  // ...фильтрация и сортировка todos как раньше

  return (
    <div style={{ padding: "20px" }}>
      <AddTodo onAdd={addTodo} />

      {/* 🔹 Сортировка через кнопку с иконкой */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <span>Сортировка:</span>
        <IconButton onClick={toggleSortOrder} color="primary">
          {sortOrder === "new" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </IconButton>
        <span>{sortOrder === "new" ? "Новые сверху" : "Старые сверху"}</span>
      </div>

      {/* 🔹 Фильтр через кнопки */}
      <Stack direction="row" spacing={1} sx={{ m: 1 }}>
        <Button
          variant={filter === "all" ? "contained" : "outlined"}
          onClick={() => setFilter("all")}
        >
          Все
        </Button>
        <Button
          variant={filter === "done" ? "contained" : "outlined"}
          onClick={() => setFilter("done")}
        >
          Готовые
        </Button>
        <Button
          variant={filter === "not-done" ? "contained" : "outlined"}
          onClick={() => setFilter("not-done")}
        >
          Неготовые
        </Button>
      </Stack>

      <TodoList todos={sortedTodos} setTodos={setTodos} />
    </div>
  );
};
