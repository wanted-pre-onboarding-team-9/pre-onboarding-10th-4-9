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

jest.mock('../contexts/ErrorContext', () => ({
  useErrorDispatch: () => ({
    showError: jest.fn(),
  }),
}));

const TODO = {
  id: '1',
  title: 'todo example',
};

describe('TodoItem', () => {
  it('should render the todo item correctly', () => {
    const { getByText } = render(<TodoItem id={TODO.id} title={TODO.title} />);

    expect(getByText(TODO.title)).toBeInTheDocument();
  });
});
