import { useEffect, useState } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';
import Dropdown from '../components/Dropdown';
import { SearchContextProvider } from '../context/SearchContext';

import { getTodoList } from '../api/todo';

import { TodoType } from '../@types/todo';

const Main = () => {
  const [todoListData, setTodoListData] = useState<TodoType[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className="container">
      <SearchContextProvider>
        <div className="inner">
          <Header />
          <InputTodo setTodos={setTodoListData} />
          <Dropdown />
          <TodoList todos={todoListData} setTodos={setTodoListData} />
        </div>
      </SearchContextProvider>
    </div>
  );
};

export default Main;
