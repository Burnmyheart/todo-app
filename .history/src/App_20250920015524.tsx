import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import { saveGroups, loadGroups } from "./utils/localStorage";
import type { TodoGroup } from "./types";
import { Container, Typography, Stack } from "@mui/material";

const App: React.FC = () => {
  const [groups, setGroups] = useState<TodoGroup[]>([]);

  useEffect(() => {
    setGroups(loadGroups());
  }, []);

  useEffect(() => {
    saveGroups(groups);
  }, [groups]);

  const addGroup = (title: string) => {
    if (!title.trim()) return;
    const newGroup: TodoGroup = {
      id: Date.now(),
      title,
      tasks: [],
      createdAt: new Date(),
    };
    setGroups((prev) => [...prev, newGroup]);
  };

  const updateGroup = (updated: TodoGroup) => {
    setGroups((prev) =>
      prev.map((group) => (group.id === updated.id ? updated : group))
    );
  };

  const moveGroup = (id: number, direction: "up" | "down") => {
    setGroups((prev) => {
      const idx = prev.findIndex((g) => g.id === id);
      if (idx === -1) return prev;

      const newGroups = [...prev];
      if (direction === "up" && idx > 0) {
        [newGroups[idx - 1], newGroups[idx]] = [newGroups[idx], newGroups[idx - 1]];
      }
      if (direction === "down" && idx < newGroups.length - 1) {
        [newGroups[idx + 1], newGroups[idx]] = [newGroups[idx], newGroups[idx + 1]];
      }
      return newGroups;
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Todo
      </Typography>
      <AddTodo onAdd={addGroup} />
      <Stack spacing={2} mt={2}>
        {groups.map((group) => (
          <TodoList
            key={group.id}
            group={group}
            onUpdateGroup={updateGroup}
            onMoveGroup={moveGroup}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default App;
