/* eslint-disable no-shadow */

import { createContext, useContext, useState } from 'react';
import { TodoType } from '../@types/todo';

interface TodoState {
  todos: TodoType[];
}

interface TodoDispatcher {
  addTodo: (todo: TodoType) => void;
  removeTodo: (id: TodoType['id']) => void;
  changeTodos: (todos: TodoType[]) => void;
}

const TodoStateContext = createContext<TodoState | null>(null);
const TodosDispatchContext = createContext<TodoDispatcher | null>(null);

const TodosContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (todo: TodoType) => {
    setTodos((prev) => [...prev, todo]);
  };

  const removeTodo = (id: TodoType['id']) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const changeTodos = (todos: TodoType[]) => {
    setTodos(todos);
  };

  return (
    <TodoStateContext.Provider value={{ todos }}>
      <TodosDispatchContext.Provider value={{ addTodo, removeTodo, changeTodos }}>
        {children}
      </TodosDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
};

export const useTodosState = () => {
  const state = useContext(TodoStateContext);
  if (!state) throw new Error('TodosProvider not found');
  return state;
};

export const useTodosDispatch = () => {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error('TodosProvider not found');
  return dispatch;
};

export default TodosContextProvider;
