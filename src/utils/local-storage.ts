const LOCAL_STORAGE = window.localStorage;
const searchKey = 'search-value';

const handleSearchValueLS = () => {
  const getItem = () => {
    return LOCAL_STORAGE.getItem(searchKey) || '';
  };

  const setItem = (value: string) => {
    LOCAL_STORAGE.setItem(searchKey, value);
  };

  return {
    get: getItem,
    set: setItem,
  };
};

export const searchLSService = handleSearchValueLS();
