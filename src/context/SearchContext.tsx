import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useSuggestions from '../hooks/useSuggestions';
import useDebounce from '../hooks/useDebounce';

const START_ACTIVE_INDEX = -1;
const DEBOUNCE_DELAY_IN_MS = 500;
interface SearchState {
  inputText: string;
  suggestions: string[];
  activeIndex: number;
  isLoading: boolean;
  hasNext: boolean;
}

interface SearchDispatcher {
  changeInputText: (keyword: string) => void;
  selectedSuggestion: (itemIndex: number) => void;
  hoverSuggestion: (itemIndex: number) => void;
  inactivate: () => void;
  moreSuggestion: (keyword: string, nextPage: number) => void;
}

const SearchContext = createContext<SearchState | null>(null);
const SearchDispatchContext = createContext<SearchDispatcher | null>(null);

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { suggestions, changeKeyword, isLoading, hasNext, moreSuggestion } = useSuggestions();
  const [inputText, setInputText] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(START_ACTIVE_INDEX);

  const debouncedWord = useDebounce<string>(inputText.trim(), DEBOUNCE_DELAY_IN_MS);
  const inactivate = () => setActiveIndex(START_ACTIVE_INDEX);
  const hoverSuggestion = (itemIndex: number) => setActiveIndex(itemIndex);

  useEffect(() => {
    (async () => changeKeyword(debouncedWord))();
  }, [debouncedWord]);

  const changeInputText = (keyword: string) => {
    setInputText(keyword);
  };

  const selectedSuggestion = (itemIndex: number) => {
    setActiveIndex(itemIndex);
  };

  const searchContextValue = useMemo(() => {
    return { inputText, activeIndex, suggestions, isLoading, hasNext };
  }, [inputText, activeIndex, suggestions, isLoading, hasNext]);

  const searchDispatchContextValue = useMemo(() => {
    return {
      changeInputText,
      inactivate,
      selectedSuggestion,
      hoverSuggestion,
      moreSuggestion,
    };
  }, [changeInputText, inactivate, selectedSuggestion, hoverSuggestion, moreSuggestion]);

  return (
    <SearchContext.Provider value={searchContextValue}>
      <SearchDispatchContext.Provider value={searchDispatchContextValue}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
};

export const useSearchState = () => {
  const state = useContext(SearchContext);
  if (!state) {
    throw new Error('SearchContextProvider not found');
  }
  return state;
};

export const useSearchDispatch = () => {
  const dispatch = useContext(SearchDispatchContext);
  if (!dispatch) {
    throw new Error('SearchContextProvider not found');
  }
  return dispatch;
};
