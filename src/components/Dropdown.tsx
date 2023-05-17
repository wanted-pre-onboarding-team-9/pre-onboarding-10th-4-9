import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import DropdownItem from './DropdownItem';
import useElementInViewport from '../hooks/useElementInViewport';

import '../styles/Dropdown.css';

const INPUTTEXT_INDEX = -1;

type DropdownProp = {
  dropdownRef: React.RefObject<HTMLUListElement>;
  children: React.ReactNode;
};

const Dropdown = ({ dropdownRef, children }: DropdownProp) => {
  const { suggestions, activeIndex, inputText } = useSearchState();
  const { goToNextPage } = useSearchDispatch();

  const lastItemRef = useElementInViewport<HTMLButtonElement>(goToNextPage);

  return (
    <ul className="dropdown-container" ref={dropdownRef}>
      {inputText.trim().length > 0 && (
        <DropdownItem index={INPUTTEXT_INDEX} isFocus={activeIndex === INPUTTEXT_INDEX}>
          {inputText}
        </DropdownItem>
      )}
      {suggestions.map((suggestion, idx) => {
        const id = suggestion + idx;
        const isFocus = activeIndex === idx;
        const isLastItem = suggestions.length - 1 === idx;

        if (isLastItem) {
          return (
            <DropdownItem key={id} index={idx} isFocus={isFocus} lastItemRef={lastItemRef}>
              {suggestion}
            </DropdownItem>
          );
        }
        return (
          <DropdownItem key={id} index={idx} isFocus={isFocus}>
            {suggestion}
          </DropdownItem>
        );
      })}
      <li className="dropdown-indicator">{children}</li>
    </ul>
  );
};

export default Dropdown;
