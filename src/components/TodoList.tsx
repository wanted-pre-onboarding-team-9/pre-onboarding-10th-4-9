import TodoItem from './TodoItem';

import { TodoType } from '../@types/todo';

type TodoListProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const TodoList = ({ todos, setTodos }: TodoListProps) => {
  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};

export default TodoList;
