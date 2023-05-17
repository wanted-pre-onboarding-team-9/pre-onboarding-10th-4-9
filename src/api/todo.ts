import apiRequest from './index';

import { CreateTodoData } from '../@types/todo';

const RESOURCE = '/todos';

export const getTodoList = async () => {
  const response = await apiRequest.get(`${RESOURCE}`);
  return response;
};

export const createTodo = async (data: CreateTodoData) => {
  const response = await apiRequest.post(`${RESOURCE}`, data);
  return response;
};

export const deleteTodo = async (id: string) => {
  const response = await apiRequest.delete(`${RESOURCE}/${id}`);
  return response;
};
