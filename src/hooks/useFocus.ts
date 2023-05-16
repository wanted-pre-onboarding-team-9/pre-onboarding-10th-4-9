import { useRef } from 'react';

const useFocus = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return { ref, setFocus };
};

export default useFocus;
