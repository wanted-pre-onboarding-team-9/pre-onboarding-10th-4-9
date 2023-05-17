import { useSearchState } from '../context/SearchContext';
import DropdownItem from './DropdownItem';

type DropdownProp = {
  children: React.ReactNode;
  onScroll: () => void;
  scrollRef: React.ForwardedRef<HTMLUListElement>;
};

const Dropdown = ({ children, onScroll, scrollRef }: DropdownProp) => {
  const { suggestions, activeIndex } = useSearchState();
  if (suggestions.length === 0) return null;

  return (
    <ul className="dropdownContainer" onScroll={onScroll} ref={scrollRef}>
      {suggestions.map((suggestion, idx) => {
        const id = suggestion + idx;
        return (
          <DropdownItem key={id} index={idx} isFocus={activeIndex === idx}>
            {suggestion}
          </DropdownItem>
        );
      })}
      {children}
    </ul>
  );
};

export default Dropdown;
