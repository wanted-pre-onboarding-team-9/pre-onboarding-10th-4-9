import { useEffect } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import Dropdown from '../components/Dropdown';
import { SearchContextProvider } from '../contexts/SearchContext';

import { getTodoList } from '../api/todo';
import { useTodosDispatch } from '../contexts/TodoContext';
import { useErrorState } from '../contexts/ErrorContext';
import ErrorModal from '../components/ErrorModal';

const Main = () => {
  const dispatch = useTodosDispatch();
  const { error } = useErrorState();

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      dispatch.changeTodos(data || []);
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
      {error && <ErrorModal />}
    </div>
  );
};

export default Main;
