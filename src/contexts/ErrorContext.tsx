/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';

interface ErrorStateInterface {
  hasError: boolean;
  error: string | null;
}

interface ErrorDispatchInterface {
  showError: (error: string) => void;
  hideError: () => void;
}

const ErrorContext = createContext<ErrorStateInterface | null>({
  hasError: false,
  error: null,
});
const ErrorDispatchContext = createContext<ErrorDispatchInterface | null>(null);

export const ErrorContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');

  const showError = (errorMessage: string) => {
    setError(errorMessage);
    setHasError(true);
  };

  const hideError = () => {
    setError(null);
    setHasError(false);
  };

  return (
    <ErrorContext.Provider value={{ hasError, error }}>
      <ErrorDispatchContext.Provider value={{ showError, hideError }}>
        {children}
      </ErrorDispatchContext.Provider>
    </ErrorContext.Provider>
  );
};

export const useErrorState = () => {
  const state = useContext(ErrorContext);
  if (!state) {
    throw new Error('ErrorContextProvider not found');
  }
  return state;
};

export const useErrorDispatch = () => {
  const dispatch = useContext(ErrorDispatchContext);
  if (!dispatch) {
    throw new Error('ErrorContextProvider not found');
  }
  return dispatch;
};
