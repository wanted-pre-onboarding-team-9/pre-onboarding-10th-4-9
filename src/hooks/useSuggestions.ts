import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import getSuggestions from '../api/search';
import { useErrorDispatch } from '../contexts/ErrorContext';

type UseSuggestionsOutput = {
  suggestions: string[];
  isLoading: boolean;
  hasNext: boolean;
};

const useSuggestions = (q: string, page: number): UseSuggestionsOutput => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState(false);
  const { showError } = useErrorDispatch();

  useEffect(() => {
    setSuggestions([]);
    setHasNext(false);
  }, [q]);

  useEffect(() => {
    if (q === '') {
      setSuggestions([]);
    } else {
      const fetch = async () => {
        setIsLoading(true);
        try {
          const { data } = await getSuggestions({ q, page });
          setSuggestions((prev) => [...prev, ...data.result]);
          setHasNext(data.page * data.limit < data.total);
        } catch (error) {
          const { response } = error as unknown as AxiosError;
          showError(response?.data.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetch();
    }
  }, [q, page]);

  return { suggestions, isLoading, hasNext };
};

export default useSuggestions;
