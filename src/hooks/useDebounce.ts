import { useEffect, useState } from 'react';
import debounce from '../utils/debounce';

const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const debounced = debounce(() => setDebouncedValue(value), delay);
    debounced();

    return () => {
      debounced.clear();
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
