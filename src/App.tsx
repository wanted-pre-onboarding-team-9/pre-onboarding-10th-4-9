import './styles/App.css';
import { ErrorContextProvider } from './contexts/ErrorContext';

import Main from './pages/Main';
import { SearchContextProvider } from './contexts/SearchContext';

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
