import React from "react";
import type { Task } from "../../types";
import TodoItem from "../TodoItem/TodoItem";

interface TodoListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, setTasks }) => {
  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p>Задач пока нет</p>
      ) : (
        tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
