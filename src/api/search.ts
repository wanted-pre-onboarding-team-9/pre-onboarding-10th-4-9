import apiRequest from './index';

const RESOURCE = '/search';
const LIMIT = 10;

export interface GetSuggestionProps {
  q: string;
  page: number;
}

const getSuggestions = ({ q, page }: GetSuggestionProps) => {
  const params = { q, page, limit: LIMIT };
  return apiRequest.get(`${RESOURCE}`, { params });
};

export default getSuggestions;
