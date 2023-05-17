/* eslint-disable no-shadow */

import { createContext, useContext, useState } from 'react';
import { TodoType } from '../@types/todo';

interface TodoState {
  todoText: string;
  todos: TodoType[];
}

const TodoStateContext = createContext<TodoState | undefined>(undefined);

interface TodoDispatcher {
  changeInputText: (title: string) => void;
  changeTodos: (todos: TodoType[]) => void;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}
const TodosDispatchContext = createContext<TodoDispatcher | undefined>(undefined);

const TodosContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoText, setTodoText] = useState<string>('');
  const [todos, setTodos] = useState<TodoType[]>([]);

  const changeInputText = (title: string) => {
    setTodoText(title);
  };

  const changeTodos = (todos: TodoType[]) => {
    setTodos(todos);
  };

  return (
    <TodoStateContext.Provider value={{ todoText, todos }}>
      <TodosDispatchContext.Provider value={{ changeInputText, changeTodos, setTodos }}>
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
