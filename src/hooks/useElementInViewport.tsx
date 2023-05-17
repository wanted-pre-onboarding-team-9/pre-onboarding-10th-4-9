import { useRef, useEffect } from 'react';

type UseElementInViewportOutput<T> = React.RefObject<T>;

const useElementInViewport = <T extends HTMLElement>(
  fn: () => void,
  options?: IntersectionObserverInit,
): UseElementInViewportOutput<T> => {
  const elementRef = useRef<T>(null);

  const callback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      fn();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [elementRef.current, options]);

  return elementRef;
};

export default useElementInViewport;
