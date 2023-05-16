import { useState } from 'react';
import getSuggestions from '../api/search';

type UseSuggestionsOutput = {
  suggestions: string[];
  changeKeyword: (keyword: string) => Promise<void>;
  isLoading: boolean;
};

const useSuggestions = (): UseSuggestionsOutput => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeKeyword = async (keyword: string) => {
    if (keyword === '') {
      setSuggestions([]);
    } else {
      setIsLoading(true);
      const sugggestions = await getSuggestions({ q: keyword, page: 1 });
      setSuggestions(sugggestions.result);
      setIsLoading(false);
    }
  };
  return { suggestions, changeKeyword, isLoading };
};

export default useSuggestions;
