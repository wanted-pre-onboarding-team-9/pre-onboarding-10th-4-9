/* eslint-disable no-console */

import { useCallback, useEffect, useState } from 'react';
import { FaPlusCircle, FaSpinner } from 'react-icons/fa';
import { createTodo } from '../api/todo';
import useFocus from '../hooks/useFocus';
import { TodoType } from '../@types/todo';
import { useSearchDispatch, useSearchState } from '../context/SearchContext';
import { useTodosDispatch } from '../contexts/TodoContext';
    
type InputTodoProps = {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const InputTodo = ({ setTodos }: InputTodoProps) => {
  const { inputText: searchInputText, isLoading: isSearchLoading } = useSearchState();
  const { changeInputText } = useSearchDispatch();

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();
    const dispatch = useTodosDispatch();

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
          return dispatch.setTodos((prev: TodoType[]) => [...prev, data]);
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
    [inputText, dispatch.setTodos],
  );
  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-text"
        placeholder="Add new todo..."
        ref={ref}
     value={inputText || searchInputText}
        onChange={(e) => {
          setInputText(e.target.value);
          dispatch.changeInputText(e.target.value);
          onChange(e)
        }}

        disabled={isLoading}
      />
      {!isSearchLoading ? (
        <button className="input-submit" type="submit">
          <FaPlusCircle className="btn-plus" />
        </button>
      ) : (
        <FaSpinner className="spinner" />
      )}
    </form>
  );
};

export default InputTodo;
