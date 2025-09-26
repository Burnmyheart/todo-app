// GroupList.tsx
import React from "react";
import { TodoGroup, Task } from "../types";
import { FaTrash, FaArrowUp, FaArrowDown, FaPlus } from "react-icons/fa";

interface GroupListProps {
  groups: TodoGroup[];
  onDeleteGroup: (id: number) => void;
  onAddTask: (groupId: number, text: string) => void;
  onDeleteTask: (groupId: number, taskId: number) => void;
  onSortGroups: (direction: "asc" | "desc") => void;
  onSortTasks: (groupId: number, direction: "asc" | "desc") => void;
}

export const GroupList: React.FC<GroupListProps> = ({
  groups,
  onDeleteGroup,
  onAddTask,
  onDeleteTask,
  onSortGroups,
  onSortTasks,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSortGroups("asc")}
          className="p-2 bg-gray-200 rounded"
        >
          <FaArrowUp />
        </button>
        <button
          onClick={() => onSortGroups("desc")}
          className="p-2 bg-gray-200 rounded"
        >
          <FaArrowDown />
        </button>
      </div>

      {groups.map((group) => (
        <div
          key={group.id}
          className="border rounded-lg p-4 shadow bg-white space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{group.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => onSortTasks(group.id, "asc")}
                className="p-2 bg-gray-200 rounded"
              >
                <FaArrowUp />
              </button>
              <button
                onClick={() => onSortTasks(group.id, "desc")}
                className="p-2 bg-gray-200 rounded"
              >
                <FaArrowDown />
              </button>
              <button
                onClick={() => onDeleteGroup(group.id)}
                className="p-2 bg-red-500 text-white rounded"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <ul className="space-y-2">
            {group.tasks.map((task: Task) => (
              <li
                key={task.id}
                className="flex items-center justify-between bg-gray-100 p-2 rounded"
              >
                <span>{task.text}</span>
                <button
                  onClick={() => onDeleteTask(group.id, task.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() =>
              onAddTask(group.id, prompt("Введите задачу") || "")
            }
            className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <FaPlus /> Добавить
          </button>
        </div>
      ))}
    </div>
  );
};
