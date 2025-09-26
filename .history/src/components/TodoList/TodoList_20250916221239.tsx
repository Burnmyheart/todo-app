import type { TodoType } from '../../types';

interface Props {
  todos: TodoType[];
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

export const TodoList = (Props) => {
  return (
    <div>
      <h1>TODO</h1>
    </div>
  );
};