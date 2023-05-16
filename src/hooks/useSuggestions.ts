import { useState } from 'react';
import getSuggestions from '../api/search';

type UseSuggestionsOutput = {
  suggestions: string[];
  changeKeyword: (keyword: string) => Promise<void>;
  isSuggestions: boolean;
};

const useSuggestions = (): UseSuggestionsOutput => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestions, setIsSuggestions] = useState<boolean>(false);

  const clearSuggestions = () => setSuggestions([]);
  const changeKeyword = async (keyword: string) => {
    if (keyword === '') {
      clearSuggestions();
      setIsSuggestions(false);
    } else {
      const sugggestions = await await getSuggestions({ q: keyword });
      setSuggestions(sugggestions.result);
      setIsSuggestions(true);
    }
  };
  return { suggestions, changeKeyword, isSuggestions };
};

export default useSuggestions;
