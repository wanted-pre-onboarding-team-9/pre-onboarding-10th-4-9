import { useCallback, useState } from 'react';

type UseIsElementInViewportOutput<T> = [(node: T) => void, boolean];

const useIsElementInViewport = <T extends HTMLElement>(
  options?: IntersectionObserverInit,
): UseIsElementInViewportOutput<T> => {
  const [isVisible, setIsVisible] = useState(false);
  const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, options);

  const ref = useCallback((node: T) => {
    if (node) {
      observer.observe(node);
    } else {
      observer.disconnect();
    }
  }, []);

  return [ref, isVisible];
};

export default useIsElementInViewport;
