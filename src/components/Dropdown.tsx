import { TbLoader2 } from 'react-icons/tb';
import { RxDotsHorizontal } from 'react-icons/rx';

import { useEffect } from 'react';
import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import DropdownItem from './DropdownItem';
import useIsElementInViewport from '../hooks/useIsElementInViewport';

import '../styles/Dropdown.css';

const Dropdown = () => {
  const { suggestions, isLoading, inputText, hasNext } = useSearchState();
  const { goToNextPage } = useSearchDispatch();

  const [lastItemRef, isVisible] = useIsElementInViewport<HTMLButtonElement>();

  useEffect(() => {
    if (isVisible) {
      goToNextPage();
    }
  }, [isVisible]);

  return (
    <ul className="dropdown-container">
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
      {hasNext && (
        <li className="dropdown-indicator">
          {isLoading ? (
            <TbLoader2 className="input-icon spinner" />
          ) : (
            <RxDotsHorizontal className="input-icon" />
          )}
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
