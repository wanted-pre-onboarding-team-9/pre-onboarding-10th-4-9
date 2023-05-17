import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { TbLoader2 } from 'react-icons/tb';
import { deleteTodo } from '../api/todo';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorDispatch } from '../contexts/ErrorContext';

import '../styles/TodoItem.css';

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
          <TbLoader2 className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
