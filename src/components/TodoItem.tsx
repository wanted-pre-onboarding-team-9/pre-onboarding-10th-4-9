import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { FaSpinner, FaTrash } from 'react-icons/fa';

import { deleteTodo } from '../api/todo';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorDispatch } from '../contexts/ErrorContext';

type TodoItemProps = {
  id: string;
  title: string;
};

const TodoItem = ({ id, title }: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { removeTodo } = useTodosDispatch();
  const { showError } = useErrorDispatch();
  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);
      removeTodo(id);
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      showError(response?.data.message);
    } finally {
      setIsLoading(false);
    }
  }, [id, removeTodo]);

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
