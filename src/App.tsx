import './styles/App.css';
import { ErrorContextProvider } from './contexts/ErrorContext';

import Main from './pages/Main';

const App = () => {
  return (
    <ErrorContextProvider>
      <Main />
    </ErrorContextProvider>
  );
};

export default App;
