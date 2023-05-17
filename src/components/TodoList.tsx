import TodoItem from './TodoItem';

import { useTodosState } from '../contexts/TodoContext';

const TodoList = () => {
  const { todos } = useTodosState();

  return todos.length ? (
    <ul>
      {todos.map(({ id, title }) => (
        <TodoItem key={id} id={id} title={title} />
      ))}
    </ul>
  ) : (
    <div className="empty-list">...</div>
  );
};

export default TodoList;
