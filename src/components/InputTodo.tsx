import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { TbLoader2 } from 'react-icons/tb';
import { FiSearch } from 'react-icons/fi';

import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorDispatch } from '../contexts/ErrorContext';

import '../styles/InputTodo.css';

export const INITIAL_PAGE_NUM = 1;

const InputTodo = () => {
  const { inputText, isLoading: isSearchLoading, currentPage } = useSearchState();
  const { changeInputText } = useSearchDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { ref: inputRef, setFocus } = useFocus();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const { addTodo } = useTodosDispatch();
  const { showError } = useErrorDispatch();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInputText(e.target.value);
    dropdownRef.current?.scrollTo(0, 0);
  };
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = inputText.trim();
        if (!trimmed) {
          return showError('Please write something');
        }

        const newItem = { title: trimmed };

        const { data } = await createTodo(newItem);

        if (data) {
          return addTodo(data);
        }
      } catch (error) {
        const { response } = error as unknown as AxiosError;
        showError(response?.data.message);
      } finally {
        changeInputText('');
        setIsLoading(false);
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
          disabled={isLoading}
        />
        {currentPage === 1 && isSearchLoading && <TbLoader2 className="input-icon spinner" />}
      </form>
    </div>
  );
};

export default InputTodo;
