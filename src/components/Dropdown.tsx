import { useEffect } from 'react';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import DropdownItem from './DropdownItem';
import useIsElementInViewport from '../hooks/useIsElementInViewport';

import '../styles/Dropdown.css';

type DropdownProp = {
  dropdownRef: React.RefObject<HTMLUListElement>;
  children: React.ReactNode;
};

const Dropdown = ({ dropdownRef, children }: DropdownProp) => {
  const { suggestions, inputText, hasNext } = useSearchState();
  const { goToNextPage } = useSearchDispatch();

  const [lastItemRef, isVisible] = useIsElementInViewport<HTMLButtonElement>();

  useEffect(() => {
    if (isVisible) {
      goToNextPage();
    }
  }, [isVisible]);

  return (
    <ul className="dropdown-container" ref={dropdownRef}>
      {inputText.trim().length > 0 && <DropdownItem>{inputText}</DropdownItem>}

      {suggestions.map((suggestion, idx) => {
        const id = suggestion + idx;
        const isLastItem = suggestions.length - 1 === idx;

        if (isLastItem) {
          return (
            <DropdownItem key={id} lastItemRef={lastItemRef}>
              {suggestion}
            </DropdownItem>
          );
        }

        return <DropdownItem key={id}>{suggestion}</DropdownItem>;
      })}
      {hasNext && <li className="dropdown-indicator">{children}</li>}
    </ul>
  );
};

export default Dropdown;
