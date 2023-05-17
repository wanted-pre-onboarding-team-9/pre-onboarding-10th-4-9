import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AxiosError } from 'axios';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorDispatch } from '../contexts/ErrorContext';
import useFocus from '../hooks/useFocus';
import { createTodo } from '../api/todo';
import Dropdown from './Dropdown';

export const INITIAL_PAGE_NUM = 1;

const InputTodo = () => {
  const { inputText, isLoading: isSearchLoading, hasNext } = useSearchState();
  const { changeInputText, goToNextPage } = useSearchDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();
  const scrollRef = useRef<HTMLUListElement>(null);
  const { addTodo } = useTodosDispatch();
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

  const moreSearch = () => {
    if (hasNext && !isSearchLoading) {
      goToNextPage();
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
          value={inputText}
          onChange={(e) => {
            changeInputText(e.target.value);
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
