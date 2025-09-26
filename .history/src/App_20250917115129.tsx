import React, { useState } from "react";
import GroupList from "./components/GroupList/GroupList";
import type { TodoGroup } from "./types";

function App() {
  const [groups, setGroups] = useState<TodoGroup[]>([]);

  const handleAddGroup = (title: string) => {
    if (!title.trim()) return;
    setGroups([
      ...groups,
      { id: Date.now(), title, tasks: [], createdAt: new Date() },
    ]);
  };

  const handleDeleteGroup = (id: number) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  const handleAddTask = (groupId: number, text: string) => {
    if (!text.trim()) return;
    setGroups(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              tasks: [
                ...g.tasks,
                {
                  id: Date.now(),
                  text,
                  completed: false,
                  createdAt: new Date(),
                },
              ],
            }
          : g
      )
    );
  };

  const handleDeleteTask = (groupId: number, taskId: number) => {
    setGroups(
      groups.map((g) =>
        g.id === groupId
          ? { ...g, tasks: g.tasks.filter((t) => t.id !== taskId) }
          : g
      )
    );
  };

  const handleSortGroups = (direction: "asc" | "desc") => {
    setGroups(
      [...groups].sort((a, b) =>
        direction === "asc"
          ? a.createdAt.getTime() - b.createdAt.getTime()
          : b.createdAt.getTime() - a.createdAt.getTime()
      )
    );
  };

  const handleSortTasks = (groupId: number, direction: "asc" | "desc") => {
    setGroups(
      groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              tasks: [...g.tasks].sort((a, b) =>
                direction === "asc"
                  ? a.createdAt.getTime() - b.createdAt.getTime()
                  : b.createdAt.getTime() - a.createdAt.getTime()
              ),
            }
          : g
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <GroupList
        groups={groups}
        onAddGroup={handleAddGroup}
        onDeleteGroup={handleDeleteGroup}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onSortGroups={handleSortGroups}
        onSortTasks={handleSortTasks}
      />
    </div>
  );
}

export default App;
