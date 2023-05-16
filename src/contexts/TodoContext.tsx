/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */

import { createContext, useContext, useState, useMemo } from 'react';
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

  const todoContextValue = useMemo(() => {
    return { todoText, todos };
  }, [todoText, todos]);

  const todoDispatchContextValue = useMemo(() => {
    return { changeInputText, changeTodos, setTodos };
  }, [changeInputText, changeTodos, setTodos]);

  return (
    <TodoStateContext.Provider value={todoContextValue}>
      <TodosDispatchContext.Provider value={todoDispatchContextValue}>
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
