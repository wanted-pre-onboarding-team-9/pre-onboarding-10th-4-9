import { useSearchState } from '../contexts/SearchContext';
import DropdownItem from './DropdownItem';

import '../styles/Dropdown.css';

type DropdownProp = {
  children: React.ReactNode;
  onScroll: () => void;
  scrollRef: React.ForwardedRef<HTMLUListElement>;
};

const Dropdown = ({ children, onScroll, scrollRef }: DropdownProp) => {
  const { suggestions, activeIndex } = useSearchState();
  if (suggestions.length === 0) return null;

  return (
    <ul className="dropdown-container" onScroll={onScroll} ref={scrollRef}>
      {suggestions.map((suggestion, idx) => {
        const id = suggestion + idx;
        return (
          <DropdownItem key={id} index={idx} isFocus={activeIndex === idx}>
            {suggestion}
          </DropdownItem>
        );
      })}
      <li className="dropdown-item dropdown-indicator">{children}</li>
    </ul>
  );
};

export default Dropdown;
