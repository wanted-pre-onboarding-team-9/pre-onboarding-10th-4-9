/* eslint-disable no-console */
/* eslint-disable no-alert */

import React, { useCallback, useEffect, useState } from 'react';

import { TodoType } from '../@types/todo';
import { createTodo } from '../api/todo';
import { useSearchDispatch, useSearchState } from '../context/SearchContext';
import useFocus from '../hooks/useFocus';

import Dropdown from './Dropdown';

type InputTodoProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};
export const INITIAL_PAGE_NUM = 1;

const InputTodo = ({ setTodos }: InputTodoProps) => {
  const {
    inputText: searchInputText,
    isLoading: isSearchLoading,
    suggestions,
    hasNext,
    currentPage,
  } = useSearchState();
  const { changeInputText, moreSuggestion, setCurrentPage } = useSearchDispatch();

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeInputText(e.target.value);
    setInputText(e.target.value);
  };
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setIsLoading(true);

        const trimmed = searchInputText ? searchInputText.trim() : inputText.trim();
        if (!trimmed) {
          return alert('Please write something');
        }

        const newItem = { title: trimmed };
        const { data } = await createTodo(newItem);

        if (data) {
          return setTodos((prev) => [...prev, data]);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setInputText('');
        setIsLoading(false);
      }

      return undefined;
    },
    [inputText, setTodos],
  );

  const moreSearch = () => {
    if (hasNext && !isSearchLoading) {
      setCurrentPage();
      moreSuggestion(searchInputText, currentPage + 1);
    }
  };

  const checkScroll = () => {
    const dropDownUL = document.querySelector('.dropdownContainer');

    if (dropDownUL) {
      const isScrollEnd = dropDownUL.scrollTop + dropDownUL.clientHeight >= dropDownUL.scrollHeight;
      if (isScrollEnd) moreSearch();
    }
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="input-text"
          placeholder="Add new todo..."
          ref={ref}
          value={inputText || searchInputText}
          onChange={onChange}
          disabled={isLoading}
        />
      </form>

      {suggestions.length !== 0 && (
        <Dropdown onScroll={checkScroll}>
          {hasNext && (isSearchLoading ? <div>Loading아이콘</div> : <div>More아이콘</div>)}
        </Dropdown>
      )}
    </div>
  );
};

export default InputTodo;
