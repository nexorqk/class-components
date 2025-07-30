import { renderHook } from '@testing-library/react';
import { searchId } from '../../components/search.tsx';
import { useSearchLocalStorage } from '../../hooks/search-local-storage.tsx';

const LS = window.localStorage;

describe('SearchLocalStorage', () => {
  const previousValue = 'pidgey';
  beforeEach(() => {
    LS.clear();
  });

  it('Intial state value has previously saved local storage value', () => {
    LS.setItem(searchId, previousValue);

    const { result } = renderHook(() => useSearchLocalStorage());

    expect(result.current[0]).toEqual(previousValue);
    expect(result.current[0]).toBeTypeOf('string');
    expect(result.current[0]).not.toBeNull();
  });
});
