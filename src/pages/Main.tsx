import { AxiosError } from 'axios';
import { useEffect } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import ErrorModal from '../components/ErrorModal';
import Dropdown from '../components/Dropdown';

import { getTodoList } from '../api/todo';
import { useSearchState } from '../contexts/SearchContext';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorDispatch, useErrorState } from '../contexts/ErrorContext';

import '../styles/Main.css';

const Main = () => {
  const { changeTodos } = useTodosDispatch();
  const { inputText } = useSearchState();
  const { hasError } = useErrorState();
  const { showError } = useErrorDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getTodoList();
        changeTodos(data || []);
      } catch (error) {
        const { response } = error as unknown as AxiosError;
        showError(response?.data.message);
      }
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo />
        {inputText && <Dropdown />}
        <TodoList />
      </div>
      {hasError && <ErrorModal />}
    </div>
  );
};

export default Main;
