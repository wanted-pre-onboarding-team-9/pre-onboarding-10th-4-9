import { createContext, useContext, useState } from 'react';
import { TodoType } from '../@types/todo';
import { createTodo } from '../api/todo';

interface TodoState {
  todos: TodoType[];
  isAdding: boolean;
}

interface TodoDispatcher {
  addTodo: (inputText: string) => Promise<void>;
  removeTodo: (id: TodoType['id']) => void;
  changeTodos: (todos: TodoType[]) => void;
}

const TodoStateContext = createContext<TodoState | null>(null);
const TodosDispatchContext = createContext<TodoDispatcher | null>(null);

const TodosContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const addTodo = async (inputText: string) => {
    setIsAdding(true);

    const trimmed = inputText.trim();
    if (!trimmed) {
      throw new Error('Please write something');
    }

    const newItem = { title: trimmed };

    const { data } = await createTodo(newItem);

    if (data) {
      setTodos((prev) => [...prev, data]);
    }

    setIsAdding(false);
  };

  const removeTodo = (id: TodoType['id']) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const changeTodos = (newTodos: TodoType[]) => {
    setTodos(newTodos);
  };

  return (
    <TodoStateContext.Provider value={{ todos, isAdding }}>
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
