import { AxiosError } from 'axios';
import { useErrorDispatch } from '../contexts/ErrorContext';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import { useTodosDispatch } from '../contexts/TodoContext';

import '../styles/DropdownItem.css';

interface DropdownItemProps {
  children: string;
  lastItemRef?: (node: HTMLButtonElement) => void;
}

const DropdownItem = ({ children: suggestion, lastItemRef }: DropdownItemProps) => {
  const { inputText } = useSearchState();
  const { changeInputText } = useSearchDispatch();
  const { addTodo } = useTodosDispatch();
  const { showError } = useErrorDispatch();

  const onClick = async () => {
    try {
      await addTodo(suggestion);
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        const { response } = error as AxiosError;
        showError(response?.data.message);
      }
    } finally {
      changeInputText('');
    }
  };

  const keywordRegex = new RegExp(`(${inputText})`, 'gi');
  const texts = suggestion.split(keywordRegex);

  return (
    <button type="button" ref={lastItemRef} className="dropdown-item" onClick={onClick}>
      {texts.map((text, idx) => {
        const key = text + idx;
        if (keywordRegex.test(text)) {
          return (
            <span key={key} className="sugegestion-item-keyword">
              {text}
            </span>
          );
        }
        return <span key={key}>{text}</span>;
      })}
    </button>
  );
};

export default DropdownItem;
