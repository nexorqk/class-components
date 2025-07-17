import { render, screen } from '@testing-library/react';
import SearchInput from '../../components/search-input';

describe('Search Input', () => {
  let searchValue = '';
  const handleSearchInputChange = (value: string) => {
    searchValue = value;
  };
  it('Render search input', () => {
    render(
      <SearchInput
        searchInputValue={searchValue}
        handleSearchInputChange={handleSearchInputChange}
      />
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
