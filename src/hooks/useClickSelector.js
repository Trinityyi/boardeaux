import { useEffect } from 'react';

const useClickSelector = (ref, selector, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (e.target.matches(selector))
        callback();
    }

  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useClickSelector;
