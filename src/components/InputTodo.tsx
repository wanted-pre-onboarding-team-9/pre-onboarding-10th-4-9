import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { FaSpinner } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { RxDotsHorizontal } from 'react-icons/rx';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { TodoType } from '../@types/todo';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorDispatch } from '../contexts/ErrorContext';
import Dropdown from './Dropdown';

import '../styles/InputTodo.css';

export const INITIAL_PAGE_NUM = 1;

const InputTodo = () => {
  const { inputText, isLoading: isSearchLoading, hasNext, currentPage } = useSearchState();
  const { changeInputText, moreSuggestion, setCurrentPage } = useSearchDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();
  const scrollRef = useRef<HTMLUListElement>(null);
  const dispatch = useTodosDispatch();
  const { showError } = useErrorDispatch();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInputText(e.target.value);
    scrollRef.current?.scrollTo(0, 0);
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
          return dispatch.setTodos((prev: TodoType[]) => [...prev, data]);
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
    [inputText, dispatch.setTodos],
  );

  const moreSearch = () => {
    if (hasNext && !isSearchLoading) {
      setCurrentPage();
      moreSuggestion(inputText, currentPage + 1);
    }
  };

  const calcScrollEnd = () => {
    const curRef = scrollRef.current;
    if (!curRef) return false;
    return curRef.scrollTop + curRef.clientHeight >= curRef.scrollHeight * 0.9;
  };

  const checkScroll = () => {
    const isScrollEnd = calcScrollEnd();

    if (isScrollEnd) moreSearch();
  };

  return (
    <div className="input-todo-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <FiSearch className="input-icon" />
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={inputText}
          onChange={(e) => {
            changeInputText(e.target.value);
            dispatch.changeInputText(e.target.value);
            onChange(e);
          }}
          disabled={isLoading}
        />
        {currentPage === 1 && isSearchLoading && <FaSpinner className="input-icon spinner" />}
      </form>

      <Dropdown onScroll={checkScroll} scrollRef={scrollRef}>
        {hasNext &&
          (isSearchLoading ? (
            <FaSpinner className="input-icon spinner" />
          ) : (
            <RxDotsHorizontal className="input-icon" />
          ))}
      </Dropdown>
    </div>
  );
};

export default InputTodo;
