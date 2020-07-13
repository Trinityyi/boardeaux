import { useEffect } from 'react';

// Reference: https://www.30secondsofcode.org/react/s/use-click-outside
const useClickOutside = (ref, callback, ignoreSelector) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      if (!ignoreSelector || !e.target.matches(ignoreSelector))
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

export default useClickOutside;
