import { useEffect, useState } from 'react';

import Header from '../components/Header';
import InputTodo from '../components/InputTodo';
import TodoList from '../components/TodoList';

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
      <div className="inner">
        <Header />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
