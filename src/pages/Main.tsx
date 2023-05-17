import { AxiosError } from 'axios';
import { useEffect } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import { SearchContextProvider } from '../contexts/SearchContext';
import ErrorModal from '../components/ErrorModal';

import { getTodoList } from '../api/todo';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorDispatch, useErrorState } from '../contexts/ErrorContext';

const Main = () => {
  const { changeTodos } = useTodosDispatch();
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
      <SearchContextProvider>
        <div className="inner">
          <Header />
          <InputTodo />
          <TodoList />
        </div>
      </SearchContextProvider>
      {hasError && <ErrorModal />}
    </div>
  );
};

export default Main;
