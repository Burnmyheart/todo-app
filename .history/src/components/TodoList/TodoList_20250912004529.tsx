import { TodoItem } from '../TodoItem/TodoItem';
import type { TodoType } from '../../types';

interface Props {
  todos: TodoType[];
  toggleComplete: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
}

export const TodoList = ({ todos, toggleComplete, deleteTodo, editTodo }: Props) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};