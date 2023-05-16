import { useSearchState } from '../context/SearchContext';
import DropdownItem from './DropdownItem';

const Dropdown = () => {
  const { suggestions, activeIndex, isSuggestions } = useSearchState();
  if (!isSuggestions) return null;

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
