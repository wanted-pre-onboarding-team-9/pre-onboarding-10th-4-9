import React from 'react';
import { render } from '@testing-library/react';
import TodoItem from './TodoItem';

jest.mock('../api/todo', () => ({
  deleteTodo: jest.fn(),
}));

jest.mock('../contexts/TodoContext', () => ({
  useTodosDispatch: () => ({
    setTodos: jest.fn(),
  }),
}));

describe('TodoItem', () => {
  it('should render the todo item correctly', () => {
    const todo = {
      id: '1',
      title: 'Buy groceries',
    };
    const { getByText } = render(<TodoItem id={todo.id} title={todo.title} />);

    expect(getByText(todo.title)).toBeInTheDocument();
  });
});
