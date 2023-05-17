import { useSearchState } from '../contexts/SearchContext';
import DropdownItem from './DropdownItem';

import '../styles/Dropdown.css';

const INPUTTEXT_INDEX = -1;

type DropdownProp = {
  children: React.ReactNode;
  onScroll: () => void;
  scrollRef: React.ForwardedRef<HTMLUListElement>;
};

const Dropdown = ({ children, onScroll, scrollRef }: DropdownProp) => {
  const { suggestions, activeIndex, inputText } = useSearchState();

  if (suggestions.length === 0 && inputText.trim().length > 0) {
    return (
      <ul className="dropdown-Container" onScroll={onScroll} ref={scrollRef}>
        <DropdownItem index={INPUTTEXT_INDEX} isFocus={activeIndex === INPUTTEXT_INDEX}>
          {inputText}
        </DropdownItem>
      </ul>
    );
  }
  return (
    <ul className="dropdown-container" onScroll={onScroll} ref={scrollRef}>
      {inputText.trim().length > 0 && (
        <DropdownItem index={INPUTTEXT_INDEX} isFocus={activeIndex === INPUTTEXT_INDEX}>
          {inputText}
        </DropdownItem>
      )}
      {suggestions.map((suggestion, idx) => {
        const id = suggestion + idx;
        return (
          <DropdownItem key={id} index={idx} isFocus={activeIndex === idx}>
            {suggestion}
          </DropdownItem>
        );
      })}
      <li className="dropdown-indicator">{children}</li>
    </ul>
  );
};

export default Dropdown;
