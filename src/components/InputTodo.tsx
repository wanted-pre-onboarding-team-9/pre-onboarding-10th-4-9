import React, { useCallback, useEffect } from 'react';
import { AxiosError } from 'axios';
import { TbLoader2 } from 'react-icons/tb';
import { FiSearch } from 'react-icons/fi';

import useFocus from '../hooks/useFocus';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import { useTodosDispatch, useTodosState } from '../contexts/TodoContext';
import { useErrorDispatch } from '../contexts/ErrorContext';
import { INITIAL_PAGE_NUM } from '../utils/constants';

import '../styles/InputTodo.css';

const InputTodo = () => {
  const { inputText, isLoading: isSearchLoading, currentPage } = useSearchState();
  const { changeInputText } = useSearchDispatch();
  const { isAdding } = useTodosState();
  const { addTodo } = useTodosDispatch();
  const { showError } = useErrorDispatch();
  const { ref: inputRef, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInputText(e.target.value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        await addTodo(inputText);
      } catch (error) {
        if (error instanceof Error) {
          showError(error.message);
        } else {
          const { response } = error as AxiosError;
          showError(response?.data.message);
        }
      } finally {
        changeInputText('');
      }

      return undefined;
    },
    [inputText, addTodo],
  );

  return (
    <div className="input-todo-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <FiSearch className="input-icon" />
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={inputRef}
          value={inputText}
          onChange={(e) => {
            changeInputText(e.target.value);
            onChange(e);
          }}
          disabled={isAdding}
        />
        {currentPage === INITIAL_PAGE_NUM && isSearchLoading && (
          <TbLoader2 className="input-icon spinner" />
        )}
      </form>
    </div>
  );
};

export default InputTodo;
