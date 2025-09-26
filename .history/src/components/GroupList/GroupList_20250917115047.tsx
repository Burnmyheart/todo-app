import React, { useState } from "react";
import { TodoGroup } from "../../types";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface GroupListProps {
  groups: TodoGroup[];
  onAddGroup: (title: string) => void;
  onDeleteGroup: (id: number) => void;
  onAddTask: (groupId: number, text: string) => void;
  onDeleteTask: (groupId: number, taskId: number) => void;
  onSortGroups: (direction: "asc" | "desc") => void;
  onSortTasks: (groupId: number, direction: "asc" | "desc") => void;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  onAddGroup,
  onDeleteGroup,
  onAddTask,
  onDeleteTask,
  onSortGroups,
  onSortTasks,
}) => {
  const [newGroup, setNewGroup] = useState("");

  return (
    <div>
      {/* Добавить новую группу */}
      <div style={{ marginBottom: "20px" }}>
        <TextField
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          placeholder="Название группы"
          size="small"
        />
        <IconButton
          color="primary"
          onClick={() => {
            onAddGroup(newGroup);
            setNewGroup("");
          }}
        >
          <AddIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => onSortGroups("asc")}>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => onSortGroups("desc")}>
          <ArrowDownwardIcon />
        </IconButton>
      </div>

      {/* Список групп */}
      {groups.map((group) => (
        <Card
          key={group.id}
          sx={{ marginBottom: 2, maxWidth: 500, backgroundColor: "#f9f9f9" }}
        >
          <CardHeader
            title={group.title}
            action={
              <IconButton onClick={() => onDeleteGroup(group.id)} color="error">
                <DeleteIcon />
              </IconButton>
            }
          />
          <CardContent>
            {/* Добавить задачу */}
            <TaskInput groupId={group.id} onAddTask={onAddTask} />

            {/* Сортировка задач */}
            <div style={{ marginBottom: "10px" }}>
              <IconButton
                color="secondary"
                onClick={() => onSortTasks(group.id, "asc")}
              >
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => onSortTasks(group.id, "desc")}
              >
                <ArrowDownwardIcon />
              </IconButton>
            </div>

            {/* Список задач */}
            {group.tasks.map((task) => (
              <Card
                key={task.id}
                sx={{ marginBottom: 1, padding: 1, backgroundColor: "#fff" }}
              >
                <Typography>{task.text}</Typography>
                <IconButton
                  onClick={() => onDeleteTask(group.id, task.id)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GroupList;

// --- Ввод задачи ---
interface TaskInputProps {
  groupId: number;
  onAddTask: (groupId: number, text: string) => void;
}
const TaskInput: React.FC<TaskInputProps> = ({ groupId, onAddTask }) => {
  const [text, setText] = useState("");

  return (
    <div style={{ marginBottom: "10px" }}>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача"
        size="small"
      />
      <IconButton
        color="primary"
        onClick={() => {
          if (!text.trim()) return;
          onAddTask(groupId, text);
          setText("");
        }}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
};
