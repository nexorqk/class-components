import { waitFor } from '@testing-library/react';
import { searchId } from '../../components/search.tsx';
import { useSearchLocalStorage } from '../../hooks/search-local-storage.tsx';

const LS = window.localStorage;

describe('SearchLocalStorage', () => {
  beforeEach(() => {
    LS.clear();
  });

  it('Intial state value has previously saved local storage value', () => {
    const previousValue = 'pidgey';
    LS.setItem(searchId, previousValue);

    waitFor(() => {
      const [value] = useSearchLocalStorage();
      expect(value).toEqual(previousValue);
      expect(value).toBeTypeOf('string');
      expect(value).not.toBeNull();
    });
  });
});
