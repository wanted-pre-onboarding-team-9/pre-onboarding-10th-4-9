import './styles/App.css';
import { ErrorContextProvider } from './contexts/ErrorContext';
import { SearchContextProvider } from './contexts/SearchContext';

import Main from './pages/Main';

const App = () => {
  return (
    <ErrorContextProvider>
      <SearchContextProvider>
        <Main />
      </SearchContextProvider>
    </ErrorContextProvider>
  );
};

export default App;
