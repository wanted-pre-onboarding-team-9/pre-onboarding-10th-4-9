import { AxiosError } from 'axios';
import { useState } from 'react';
import getSuggestions from '../api/search';
import { useErrorDispatch } from '../contexts/ErrorContext';

type UseSuggestionsOutput = {
  suggestions: string[];
  changeKeyword: (keyword: string) => Promise<void>;
  isLoading: boolean;
  hasNext: boolean;
  moreSuggestion: (keyword: string, nextPage: number) => Promise<void>;
};

const useSuggestions = (): UseSuggestionsOutput => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState(false);
  const { showError } = useErrorDispatch();

  const changeKeyword = async (keyword: string) => {
    if (keyword === '') {
      setSuggestions([]);
    } else {
      setIsLoading(true);
      try {
        const { data } = await getSuggestions({ q: keyword, page: 1 });
        setSuggestions(data.result);
        setHasNext(data.page * data.limit < data.total);
      } catch (error) {
        const { response } = error as unknown as AxiosError;
        showError(response?.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const moreSuggestion = async (keyword: string, nextPage: number) => {
    if (keyword === '') {
      setSuggestions([]);
    } else {
      setIsLoading(true);
      try {
        const { data } = await getSuggestions({ q: keyword, page: nextPage });
        if (data) {
          setSuggestions((prev) => [...prev, ...data.result]);
          setHasNext(data.page * data.limit < data.total);
        }
      } catch (error) {
        const { response } = error as unknown as AxiosError;
        showError(response?.data.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return { suggestions, changeKeyword, isLoading, hasNext, moreSuggestion };
};

export default useSuggestions;
