import React from 'react';
import { render } from '@testing-library/react';
import { useTodosState } from '../contexts/TodoContext';
import TodoList from './TodoList';

jest.mock('../contexts/TodoContext');

describe('TodoList', () => {
  test('renders ... when todo list is empty', () => {
    const emptyTodos = {
      todos: [],
    };
    (useTodosState as jest.Mock).mockReturnValue(emptyTodos);
    const { getByText } = render(<TodoList />);

    expect(getByText('...')).toBeInTheDocument();
  });
});
