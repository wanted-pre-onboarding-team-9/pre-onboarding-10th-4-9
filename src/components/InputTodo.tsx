import { AxiosError } from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Dropdown from './Dropdown';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorDispatch } from '../contexts/ErrorContext';

import useFocus from '../hooks/useFocus';
import { TodoType } from '../@types/todo';
import { createTodo } from '../api/todo';

export const INITIAL_PAGE_NUM = 1;

const InputTodo = () => {
  const {
    inputText: searchInputText,
    isLoading: isSearchLoading,
    hasNext,
    currentPage,
  } = useSearchState();
  const { changeInputText, moreSuggestion, setCurrentPage } = useSearchDispatch();
  const [inputText, setInputText] = useState('');
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
    setInputText(e.target.value);
    scrollRef.current?.scrollTo(0, 0);
  };
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = searchInputText ? searchInputText.trim() : inputText.trim();
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
        setInputText('');
        setIsLoading(false);
      }

      return undefined;
    },
    [inputText, dispatch.setTodos],
  );

  const moreSearch = () => {
    if (hasNext && !isSearchLoading) {
      setCurrentPage();
      moreSuggestion(searchInputText, currentPage + 1);
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
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={inputText || searchInputText}
          onChange={(e) => {
            setInputText(e.target.value);
            dispatch.changeInputText(e.target.value);
            onChange(e);
          }}
          disabled={isLoading}
        />
      </form>

      <Dropdown onScroll={checkScroll} scrollRef={scrollRef}>
        {hasNext && (isSearchLoading ? <div>Loading아이콘</div> : <div>More아이콘</div>)}
      </Dropdown>
    </div>
  );
};

export default InputTodo;
