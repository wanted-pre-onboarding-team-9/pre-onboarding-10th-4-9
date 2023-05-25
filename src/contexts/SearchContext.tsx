import { createContext, useContext, useEffect, useState } from 'react';
import useSuggestions from '../hooks/useSuggestions';
import useDebounce from '../hooks/useDebounce';
import { INITIAL_PAGE_NUM } from '../utils/constants';

const DEBOUNCE_DELAY_IN_MS = 500;

interface SearchState {
  inputText: string;
  suggestions: string[];
  isLoading: boolean;
  hasNext: boolean;
  currentPage: number;
}

interface SearchDispatcher {
  changeInputText: (keyword: string) => void;
  goToNextPage: () => void;
}

const SearchContext = createContext<SearchState | null>(null);
const SearchDispatchContext = createContext<SearchDispatcher | null>(null);

export const SearchContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputText, setInputText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_NUM);

  const debouncedWord = useDebounce<string>(inputText.trim(), DEBOUNCE_DELAY_IN_MS);
  const { suggestions, isLoading, hasNext } = useSuggestions(debouncedWord, currentPage);

  useEffect(() => {
    setCurrentPage(INITIAL_PAGE_NUM);
  }, [debouncedWord]);

  const changeInputText = (keyword: string) => {
    setInputText(keyword);
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <SearchContext.Provider value={{ inputText, suggestions, isLoading, hasNext, currentPage }}>
      <SearchDispatchContext.Provider
        value={{
          changeInputText,
          goToNextPage,
        }}
      >
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
