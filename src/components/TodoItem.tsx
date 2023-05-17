import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

import { FaSpinner, FaTrash } from 'react-icons/fa';

import { deleteTodo } from '../api/todo';

import { TodoType } from '../@types/todo';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorDispatch } from '../contexts/ErrorContext';

import '../styles/TodoItem.css';

type TodoItemProps = {
  id: string;
  title: string;
};

const TodoItem = ({ id, title }: TodoItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useTodosDispatch();
  const { showError } = useErrorDispatch();
  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);

      await deleteTodo(id);

      dispatch.setTodos((prev: TodoType[]) => prev.filter((item: TodoType) => item.id !== id));
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      showError(response?.data.message);
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
