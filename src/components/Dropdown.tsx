import { useRef } from 'react';
import { TbLoader2 } from 'react-icons/tb';
import { RxDotsHorizontal } from 'react-icons/rx';

import { useSearchDispatch, useSearchState } from '../contexts/SearchContext';
import DropdownItem from './DropdownItem';
import useElementInViewport from '../hooks/useElementInViewport';

import '../styles/Dropdown.css';

const INPUTTEXT_INDEX = -1;

const Dropdown = () => {
  const { suggestions, isLoading, activeIndex, inputText, hasNext } = useSearchState();
  const { goToNextPage } = useSearchDispatch();
  const dropdownRef = useRef<HTMLUListElement>(null);

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
      {hasNext && (
        <li className="dropdown-indicator">
          {hasNext &&
            (isLoading ? (
              <TbLoader2 className="input-icon spinner" />
            ) : (
              <RxDotsHorizontal className="input-icon" />
            ))}
        </li>
      )}
    </ul>
  );
};

export default Dropdown;
