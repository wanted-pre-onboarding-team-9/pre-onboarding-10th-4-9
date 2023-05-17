import { useEffect } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import { SearchContextProvider } from '../context/SearchContext';
import { getTodoList } from '../api/todo';
import { TodoType } from '../@types/todo';
import { useTodosDispatch } from '../contexts/TodoContext';

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
          <InputTodo setTodos={setTodoListData} />
          <TodoList todos={todoListData} setTodos={setTodoListData} />
        </div>
      </SearchContextProvider>
    </div>
  );
};

export default Main;
