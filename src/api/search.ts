import { GetSuggestionProps } from '../@types/search';
import apiRequest from './index';

const RESOURCE = '/search';
const LIMIT = 10;

const getSuggestions = async ({ q, page = 1, limit = LIMIT }: GetSuggestionProps) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}?q=${q}&page=${page}&limit=${limit}`, {});
    return response.data;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export default getSuggestions;
