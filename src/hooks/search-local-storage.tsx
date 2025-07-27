import { useState, useEffect } from 'react';

import { searchId } from '../components/search';

const LS = window.localStorage;

export const useSearchLocalStorage = (): [
  string,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [value, setValue] = useState(() => {
    const data = LS.getItem(searchId);
    if (data !== null && typeof data === 'string') return data;
    return '';
  });

  useEffect(() => {
    if (typeof value === 'string') LS.setItem(searchId, value);
  }, [value]);

  return [value, setValue];
};
