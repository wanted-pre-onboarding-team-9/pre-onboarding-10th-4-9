import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useSuggestions from '../hooks/useSuggestions';
import { DEBOUNCE_DELAY_IN_MS, START_ACTIVE_INDEX } from '../const';
import useDebounce from '../hooks/useDebounce';

interface SearchState {
  inputText: string;
  suggestions: string[];
  activeIndex: number;
  isSuggestions: boolean;
  isLoading: boolean;
}

interface SearchDispatcher {
  changeInputText: (keyword: string) => void;
  selectedSuggestion: (itemIndex: number) => void;
  hoverSuggestion: (itemIndex: number) => void;
  inactivate: () => void;
  changeLoading: (loadingState: boolean) => void;
}

const SearchContext = createContext<SearchState | null>(null);
const SearchDispatchContext = createContext<SearchDispatcher | null>(null);

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { suggestions, changeKeyword, isSuggestions } = useSuggestions();
  const [inputText, setInputText] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState(START_ACTIVE_INDEX);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const debouncedWord = useDebounce<string>(inputText.trim(), DEBOUNCE_DELAY_IN_MS);
  const inactivate = () => setActiveIndex(START_ACTIVE_INDEX);
  const hoverSuggestion = (itemIndex: number) => setActiveIndex(itemIndex);

  useEffect(() => {
    setIsLoading(true);
    (async () => changeKeyword(debouncedWord))();
    setIsLoading(false);
  }, [debouncedWord]);

  const changeInputText = (keyword: string) => {
    setInputText(keyword);
  };

  const selectedSuggestion = (itemIndex: number) => {
    setActiveIndex(itemIndex);
  };
  const changeLoading = (loadingState: boolean) => {
    setIsLoading(loadingState);
  };

  const searchContextValue = useMemo(() => {
    return { inputText, activeIndex, suggestions, isSuggestions, isLoading };
  }, [inputText, activeIndex, suggestions, isSuggestions, isLoading]);

  const searchDispatchContextValue = useMemo(() => {
    return {
      changeInputText,
      inactivate,
      selectedSuggestion,
      hoverSuggestion,
      changeLoading,
    };
  }, [changeInputText, inactivate, selectedSuggestion, hoverSuggestion, changeLoading]);

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
