import { useEffect } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import { SearchContextProvider } from '../contexts/SearchContext';
import { getTodoList } from '../api/todo';
import { useTodosDispatch } from '../contexts/TodoContext';

import '../styles/Main.css';

const Main = () => {
  const dispatch = useTodosDispatch();

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
    </div>
  );
};

export default Main;
