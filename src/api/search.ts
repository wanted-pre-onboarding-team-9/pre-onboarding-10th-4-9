import apiRequest from './index';

const RESOURCE = '/search';
const LIMIT = 10;

export interface GetSuggestionProps {
  q: string;
  page: number;
}

const getSuggestions = async ({ q, page = 1 }: GetSuggestionProps) => {
  try {
    const response = await apiRequest.get(`${RESOURCE}?q=${q}&page=${page}&limit=${LIMIT}`);
    return response.data;
  } catch (error) {
    throw new Error('API getTodoList error');
  }
};

export default getSuggestions;
