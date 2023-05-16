import { useCallback, useState } from 'react';

import { FaSpinner, FaTrash } from 'react-icons/fa';

import { deleteTodo } from '../api/todo';

import { TodoType } from '../@types/todo';
import { useTodosDispatch } from '../contexts/TodoContext';

type TodoItemProps = {
  id: string;
  title: string;
};

const TodoItem = ({ id, title }: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useTodosDispatch();
  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);

      await deleteTodo(id);

      dispatch.setTodos((prev: TodoType[]) => prev.filter((item: TodoType) => item.id !== id));
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [id, dispatch.setTodos]);

  return (
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          <button type="button" onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
