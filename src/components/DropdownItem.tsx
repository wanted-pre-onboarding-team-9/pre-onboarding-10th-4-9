import { createTodo } from '../api/todo';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import { useTodosDispatch } from '../contexts/TodoContext';

import '../styles/DropdownItem.css';

interface DropdownItemProps {
  index: number;
  children: string;
  isFocus: boolean;
}

const DropdownItem = ({ index, children: suggestion, isFocus }: DropdownItemProps) => {
  const { inputText } = useSearchState();
  const { hoverSuggestion, inactivate, changeInputText } = useSearchDispatch();
  const { addTodo } = useTodosDispatch();
  const onMouseEnter = () => hoverSuggestion(index);

  const onClick = async () => {
    const newItem = { title: suggestion };
    const { data } = await createTodo(newItem);
    if (data) {
      addTodo(data);
      changeInputText('');
    }
  };

  const keywordRegex = new RegExp(`(${inputText})`, 'gi');
  const texts = suggestion.split(keywordRegex);

  return (
    <button
      type="button"
      className={`dropdown-item ${isFocus ? 'active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={inactivate}
      onClick={onClick}
    >
      {texts.map((text, idx) => {
        const key = text + idx;
        if (keywordRegex.test(text)) {
          return (
            <span className="sugegestion-item-text sugegestion-item-keyword" key={key}>
              {text}
            </span>
          );
        }
        return (
          <span className="sugegestion-item-text" key={key}>
            {text}
          </span>
        );
      })}
    </button>
  );
};

export default DropdownItem;
