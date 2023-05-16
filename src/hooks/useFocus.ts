import { useRef } from 'react';

const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setFocus = () => {
    // eslint-disable-next-line no-unused-expressions
    ref.current && ref.current.focus();
  };

  return { ref, setFocus };
};

export default useFocus;
