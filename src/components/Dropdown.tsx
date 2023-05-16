import { useSearchState } from '../context/SearchContext';
import DropdownItem from './DropdownItem';

type DropdownProp = {
  children: React.ReactNode;
  onWheel: () => void;
};

const Dropdown = ({ onWheel, children }: DropdownProp) => {
  const { suggestions, activeIndex } = useSearchState();
  if (suggestions.length === 0) return null;

  return (
    <ul className="dropdownContainer" onWheel={onWheel}>
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
