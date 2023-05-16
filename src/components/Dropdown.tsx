import { useSearchState } from '../context/SearchContext';
import DropdownItem from './DropdownItem';

const Dropdown = () => {
  const { suggestions, activeIndex } = useSearchState();
  if (suggestions.length === 0) return null;

  return (
    <ul>
      {suggestions.map((suggestion, idx) => {
        const id = suggestion + idx;
        return (
          <DropdownItem key={id} index={idx} isFocus={activeIndex === idx}>
            {suggestion}
          </DropdownItem>
        );
      })}
    </ul>
  );
};

export default Dropdown;
