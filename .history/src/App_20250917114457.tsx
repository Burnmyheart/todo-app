import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import TodoList from "./components/TodoList/TodoList";
import { saveGroups, loadGroups } from "./utils/localStorage";
import type { TodoGroup } from "./types";

const App: React.FC = () => {
  const [groups, setGroups] = useState<TodoGroup[]>([]);

  useEffect(() => {
    setGroups(loadGroups());
  }, []);

  useEffect(() => {
    saveGroups(groups);
  }, [groups]);

  const addGroup = (title: string) => {
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

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Todo Groups</h1>
      <AddTodo onAdd={addGroup} />
      {groups.map((group) => (
        <TodoList key={group.id} group={group} onUpdateGroup={updateGroup} />
      ))}
    </div>
  );
};

export default App;
