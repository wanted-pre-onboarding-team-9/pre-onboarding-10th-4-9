import { useState } from 'react';
import getSuggestions from '../api/search';

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

  const changeKeyword = async (keyword: string) => {
    if (keyword === '') {
      setSuggestions([]);
    } else {
      setIsLoading(true);
      const { data } = await getSuggestions({ q: keyword, page: 1 });
      setSuggestions(data.result);
      setHasNext(data.page * data.limit < data.total);
      setIsLoading(false);
    }
  };

  const moreSuggestion = async (keyword: string, nextPage: number) => {
    if (keyword === '') {
      setSuggestions([]);
    } else {
      setIsLoading(true);
      const { data } = await getSuggestions({ q: keyword, page: nextPage });
      if (data) {
        setSuggestions((prev) => [...prev, ...data.result]);
        setHasNext(data.page * data.limit < data.total);
      }
      setIsLoading(false);
    }
  };

  return { suggestions, changeKeyword, isLoading, hasNext, moreSuggestion };
};

export default useSuggestions;
