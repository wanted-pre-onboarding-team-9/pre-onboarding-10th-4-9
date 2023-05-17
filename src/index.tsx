import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import TodosContextProvider from './contexts/TodoContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <TodosContextProvider>
      <App />
    </TodosContextProvider>
  </React.StrictMode>,
);
