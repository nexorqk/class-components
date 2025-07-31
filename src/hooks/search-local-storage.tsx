import { useState, useEffect } from 'react';

import { searchId } from '../components/search';

const LS = window.localStorage;

export const useSearchLocalStorage = (): [
  string | undefined,
  React.Dispatch<React.SetStateAction<string | undefined>>,
] => {
  const [value, setValue] = useState(() => {
    try {
      const data = LS.getItem(searchId);
      if (data !== null && typeof data === 'string') return data;
      return '';
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (typeof value === 'string') LS.setItem(searchId, value);
  }, [value]);

  return [value, setValue];
};
